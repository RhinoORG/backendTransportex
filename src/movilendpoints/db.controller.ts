import { Controller, Get, Post, Query } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { myArray } from 'src/users.array';
import { DataService } from './db.service';
import { CreateNoveltyInputDto } from './dto/noveltyInput.dto';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}
  /* A function that is called when the user makes a GET request to the endpoint /data/empresas. */
  @Get('empresas')
  async consultaEmpresas(@Query('client') userName: string) {
    const filteredArray = myArray.filter((obj) => obj.name === userName);
    const result = this.dataService.empresas(filteredArray);
    return result;
  }
  /* A function that is called when the user makes a POST request to the endpoint /data/login. */
  @Post('login')
  async consultaLogin(
    @Query('client') userName: string,
    @Body()
    {
      password,
      username,
      idEmpresa,
    }: { password: string; username: string; idEmpresa: number },
  ) {
    console.log(userName, username, password);
    const filteredArray = myArray.filter((obj) => obj.name === userName);
    const result = this.dataService.login(
      filteredArray,
      password,
      username,
      idEmpresa,
    );
    return result;
  }

  /* A function that is called when the user makes a POST request to the endpoint /data/logout. */
  @Post('logout')
  async consultaLogout(
    @Query('client') userName: string,
    @Body()
    {
      idEmpresa,
      ID_Conexion,
      Fecha_Sesion,
    }: { idEmpresa: number; ID_Conexion: number; Fecha_Sesion: string },
  ) {
    console.log(userName);
    const filteredArray = myArray.filter((obj) => obj.name === userName);
    const result = this.dataService.logout(
      filteredArray,
      idEmpresa,
      ID_Conexion,
      Fecha_Sesion,
    );
    return result;
  }

  @Get('vehiculos')
  async consultaVehiculos(@Query('client') userName: string) {
    const filteredArray = myArray.filter((obj) => obj.name === userName);
    const result = this.dataService.vehiculos(filteredArray);
    return result;
  }
  @Get('usuarios')
  async consultaUsuarios(@Query('client') userName: string) {
    const filteredArray = myArray.filter((obj) => obj.name === userName);
    const result = this.dataService.usuarios(filteredArray);
    return result;
  }
  @Post('kilometraje')
  async consultaKilometraje(
    @Query('client') userName: string,
    @Body()
    {
      id_vehiculo,
      kilometros,
      observaciones,
      horas,
      observaciones_horas,
      usuario_mod,
      tipo,
      manual,
      id_viaje,
      act_cascada_cavas,
    }: {
      id_vehiculo: number;
      kilometros: number;
      observaciones: string;
      horas: number;
      observaciones_horas: string;
      usuario_mod: string;
      tipo: string;
      manual: number;
      id_viaje: number;
      act_cascada_cavas: number;
    },
  ) {
    console.log(userName);
    const filteredArray = myArray.filter((obj) => obj.name === userName);
    const result = this.dataService.kilometraje(
      filteredArray,
      id_vehiculo,
      kilometros,
      observaciones,
      horas,
      observaciones_horas,
      usuario_mod,
      tipo,
      manual,
      id_viaje,
      act_cascada_cavas,
    );
    return result;
  }
  @Post('permisos')
  async consultaPermisos(
    @Query('client') userName: string,
    @Body() { idUser, columna }: { idUser: number; columna: string },
  ) {
    console.log(idUser, columna);
    const filteredArray = myArray.filter((obj) => obj.name === userName);
    const result = this.dataService.permisos(filteredArray, idUser, columna);
    return result;
  }
  @Post('configuracion')
  async consultaConfiguracion(
    @Query('client') userName: string,
    @Body() { idEmpresa, campo }: { idEmpresa: number; campo: string },
  ) {
    console.log(idEmpresa, campo);
    const filteredArray = myArray.filter((obj) => obj.name === userName);
    const result = this.dataService.configuracion(
      filteredArray,
      idEmpresa,
      campo,
    );
    return result;
  }
  @Get('actividadTipo')
  async getActivityType(@Query('client') userName: string) {
    const filteredArray = myArray.filter((obj) => obj.name === userName);
    const result = this.dataService.actividadtipo(filteredArray);
    return result;
  }
  @Get('novedades')
  async getNoveltyList(@Query('client') userName: string) {
    const filteredArray = myArray.filter((obj) => obj.name === userName);
    const result = this.dataService.novedades(filteredArray, 1, 0);
    return result;
  }
  @Post('novedades')
  async createNovelty(
    @Query('client') userName: string,
    @Body() body: CreateNoveltyInputDto,
  ) {
    const filteredArray = myArray.filter((obj) => obj.name === userName);
    const {
      id_actividad_solicitud,
      id_vehiculo,
      id_actividad_grupo,
      id_empleado_solicitud,
      urgente,
      descripcion,
      usuario_str,
      id_empresa_sesion,
    } = body;
    const booleanUrgent = urgente === true ? 1 : 0;
    const date = new Date();
    const fecha_solicitud = date
      .toISOString()
      .replace('T', ' ')
      .replace('Z', '');
    const result = this.dataService.novedadinput(
      filteredArray,
      id_actividad_solicitud,
      id_vehiculo,
      id_actividad_grupo,
      id_empleado_solicitud,
      fecha_solicitud,
      booleanUrgent,
      descripcion,
      usuario_str,
      id_empresa_sesion,
    );
    return result;
  }
}
