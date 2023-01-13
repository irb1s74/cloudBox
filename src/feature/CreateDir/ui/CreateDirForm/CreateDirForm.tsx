import { ChangeEvent, FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider, IconButton,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { fileService } from 'entities/File';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { getNameDir } from '../../model/selectors/getNameDir/getNameDir';
import { createDirActions, createDirReducer } from '../../model/slice/createDirSlice';

const initialReducers: ReducersList = {
    createDir: createDirReducer,
};

export interface CreateDirFormProps {
    handleCloseModal: () => void;
}

const CreateDirForm: FC<CreateDirFormProps> = ({ handleCloseModal }) => {
    const dispatch = useAppDispatch();
    const name = useSelector(getNameDir);
    const [usePath] = useSearchParams();
    const path = usePath.get('path');

    const [formError, setFormError] = useState('');
    const [createDir, { data: res, error, isLoading }] = fileService.useCreateDirMutation();

    const handleOnChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(createDirActions.setNameDir(event.target.value));
    };

    const onClick = () => {
        createDir({ path: path || '', name })
            .unwrap()
            .then(() => {
                handleCloseModal();
            })
            .catch((error) => {
                if (error.status === 400) {
                    setFormError('Директория с таким именем уже существует');
                }
            });
    };

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <Card sx={{ width: 385 }}>
                {/* <CardHeader title='Создать директорию' /> */}
                <Stack sx={{ p: '16px' }} direction='row' alignItems='center' justifyContent='space-between'>
                    <Typography variant='h5'>Создать директорию</Typography>
                    <IconButton onClick={handleCloseModal}>
                        <IoClose />
                    </IconButton>
                </Stack>
                <Divider />
                <CardContent>
                    <TextField
                        value={name}
                        onChange={handleOnChangeName}
                        variant='outlined'
                        label='Название директории'
                        fullWidth
                    />
                    {formError && (
                        <Typography textAlign='center' color='error'>{formError}</Typography>
                    )}
                </CardContent>
                <CardActions>
                    <Button
                        onClick={onClick}
                        disabled={isLoading}
                        variant='contained'
                        fullWidth
                    >
                        Создать
                    </Button>
                </CardActions>
            </Card>
        </DynamicModuleLoader>
    );
};

export default CreateDirForm;
