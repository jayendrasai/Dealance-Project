import { registerEnumType } from '@nestjs/graphql';
import { Stage, Visibility } from '@prisma/client';

registerEnumType(Stage, {
  name: 'Stage',
  description: 'The stage of the startup idea',
});

registerEnumType(Visibility, {
  name: 'Visibility',
  description: 'Idea visibility settings',
});

export { Stage, Visibility };
