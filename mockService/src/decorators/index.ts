import 'reflect-metadata';

export enum ClassKeys {
  BasePath = 'BASE_PATH',
  Middleware = 'MIDDLEWARE',
  Wrapper = 'WRAPPER',
  Children = 'CHILDREN',
  Options = 'OPTIONS',
}

export function Controller(path: string): ClassDecorator {
  return <TFunction extends Function>(target: TFunction) => {
    Reflect.defineMetadata(ClassKeys.BasePath, path, target);
    return target;
  };
}

export function GET(path?: string): MethodDecorator {
  return helperForRoutes('get', path);
}

export function POST(path?: string): MethodDecorator {
  return helperForRoutes('post', path);
}

export function PUT(path?: string): MethodDecorator {
  return helperForRoutes('put', path);
}

export function DELETE(path?: string): MethodDecorator {
  return helperForRoutes('delete', path);
}

function helperForRoutes(httpVerb: string, path?: string): MethodDecorator {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor?: PropertyDescriptor
  ) => {
    let routeProperties = Reflect.getOwnMetadata(propertyKey, target);
    if (!routeProperties) {
      routeProperties = {};
    }
    routeProperties = {
      httpVerb,
      path: path ? path : '',
      ...routeProperties,
    };
    Reflect.defineMetadata(propertyKey, routeProperties, target);

    if (descriptor) {
      return descriptor;
    }
  };
}
