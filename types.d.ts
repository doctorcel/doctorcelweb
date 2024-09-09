declare module 'swagger-ui-react' {
    import { ComponentType } from 'react';
  
    interface SwaggerUIProps {
      spec: Record<string, any>;
    }
  
    const SwaggerUI: ComponentType<SwaggerUIProps>;
  
    export default SwaggerUI;
  }