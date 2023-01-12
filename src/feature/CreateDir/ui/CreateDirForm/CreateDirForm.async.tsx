import { FC, lazy } from 'react';
import { CreateDirFormProps } from './CreateDirForm';

export const CreateDirFormAsync = lazy<FC<CreateDirFormProps>>(() => import('./CreateDirForm'));
