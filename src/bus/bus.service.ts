import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Prisma, Bus } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { RoutesService } from 'src/routes/routes.service';
import { updateBusDetails } from 'src/types/update-bus-details';

@Injectable()
export class BusService {
  @Inject()
  private readonly prisma: PrismaService;

  constructor(private readonly routesService: RoutesService) {}

  async generateNIA(): Promise<string>{
    const lastBus = await this.prisma.bus.findFirst({
      orderBy: { updatedAt: 'desc' },
      select: { nia: true }
    })
    let number = 1;
    if (lastBus?.nia){
      const match = lastBus.nia.match(/BUS-(\d+)/);
      if(match)
        number = parseInt(match[1])+1;
    }
    return `BUS-${String(number).padStart(4, '0')}`
  }
  //Criando o Bus
  async createBus(data: Prisma.BusCreateInput) {
    const nia = await this.generateNIA();

    return this.prisma.bus.create({ 
      data:{
        ... data,
        nia,
      } 
    });
  }

  //Mostrar os Buses
    async buses(): Promise<Bus[]> {
        const buses = await this.prisma.bus.findMany({
            include: {
                driver: {
                    select: { name: true,}
                },
                route: {
                    select: { name: true,}
                }
            }
        });
        return buses.map((bus) => {
            const { route, driver, ...simplifiedBus } = bus;
            return {
                ...simplifiedBus,
                driverName: driver?.name || 'N/A',
                route: route?.name || 'N/A'    
            }
        });
    }

    async busesWithRoute() :Promise<Bus[]>{
        return await this.prisma.bus.findMany({
            where: {
                routeId: { not: undefined },
            }
        });
    }

    async countBuses(): Promise<{ count:number }> {
        const count = await this.prisma.bus.count();
        return { count };
    }


    async pendingBuses(): Promise<{ count:number, buses: Bus[] }>{
        const pendingBuses = await this.prisma.bus.findMany({
            where: {
                driverId: null,
            }
        });
        const countPending = pendingBuses.length;
        return {
            count: countPending,
            buses: pendingBuses,
        };
    }

    async countAvailableBuses(): Promise<{ count: number, buses: Bus[] }>{
        const availableBuses = await this.prisma.bus.findMany({
            where: {
                driver: {
                    status: {
                        in: ['AVAILABLE', 'IN_TRANSIT']    
                    }
            },
            AND: {
              status: {
                in: ['IN_TRANSIT']
              }
            }
            }
        });
        return {
            count: availableBuses.length,
            buses: availableBuses
        }
    }

    async countInactiveBuses(): Promise<{ count: number, buses: Bus[] }>{
        const inactiveBuses = await this.prisma.bus.findMany({
            where: {
                OR: [
                    {
                        driver: {
                            status: 'OFFLINE'
                        }
                    },
                    {
                        status: {
                            in: ['ACCIDENT', 'BREAKDOWN']
                        }
                    }
                ]
            }
        });
        
        return {
            count: inactiveBuses.length,
            buses: inactiveBuses
        }

    }

  async findBusById(id: number): Promise<Bus | null> {
    return this.prisma.bus.findUnique({
      where: {
        id,
      },
    });
  }

  async findBusByDriverId(driverId: number): Promise<Bus | null> {
    return this.prisma.bus.findFirst({
      where: { driverId },
    });
  }

  async findBusAndDetailsByDriverId(driverId: number) {
    return this.prisma.bus.findFirst({
      where: { driverId },
      include: {
        driver: {
          select: {
            name: true,
            url_foto_de_perfil: true,
          },
        },
        route: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async updateBus(id: number, data: Prisma.BusUpdateInput): Promise<Bus> {
    return this.prisma.bus.update({ where: { id }, data });
  }
  async deleteBus(id: number): Promise<Bus> {
    return this.prisma.bus.delete({ where: { id } });
  }

  async provideBusDetails(driverId: number) {
  return await this.prisma.bus.findFirst({
    where: { driverId },
    include: {
      route: {
        include: {
          routeStops: {
            include: {
              stop: true,
            },
            orderBy: { order: 'asc' }
          }
        }
      }
    }
  });
}

  // driver app (manage screen)
  async updateBusDetails(id: number, data: updateBusDetails) {
    return this.prisma.bus.update({ where: { id }, data });
  }

  async changeRoute(driverId: number, newRouteId: number) {
    const bus = await this.prisma.bus.findFirst({ where: { driverId } });

    if (!bus) {
      throw new NotFoundException('Este autocarro não existe');
    }

    if (!newRouteId) {
      throw new BadRequestException('Informe a nova rota');
    }

    const newRoute = await this.routesService.findOne(newRouteId)

    if (!newRoute) {
      throw new NotFoundException('Esta rota não existe !');
    }

    return this.prisma.bus.update({
      where: { id: bus.id },
      data: { routeId: newRouteId },
    });
  }

  async changeStatus(
    driverId: number,
    data: Prisma.BusUpdateInput,
  ): Promise<Bus> {
    const bus = await this.prisma.bus.findFirst({ where: { driverId } });

    if (!bus) {
      throw new NotFoundException('Este autocarro não existe');
    }

    if (!data.status) throw new BadRequestException('Informe o novo status');

    const currentStatus = bus.status === data.status ? bus.status : data.status;

    // if(!currentStatus) throw new BadRequestException("isso")

    return this.prisma.bus.update({
      where: { id: bus.id },
      data: { status: currentStatus },
    });
  }
}
