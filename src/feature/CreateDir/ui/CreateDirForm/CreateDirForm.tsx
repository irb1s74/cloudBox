import { ChangeEvent, FC } from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, Divider, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { getNameDir } from 'feature/CreateDir/model/selectors/getNameDir/getNameDir';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { fileService } from 'entities/File';
import { useSearchParams } from 'react-router-dom';
import { createDirActions, createDirReducer } from '../../model/slice/createDirSlice';

const initialReducers: ReducersList = {
    createDir: createDirReducer,
};

export interface CreateDirFormProps {
    handleCloseModal: () => void;
}

const CreateDirForm: FC<CreateDirFormProps> = ({ handleCloseModal }) => {
    const [usePath] = useSearchParams();
    const path = usePath.get('path');
    const dispatch = useAppDispatch();
    const name = useSelector(getNameDir);
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
                // if (error.status === 400) {
                //     formik.errors.name = 'Директория с таким именем уже существует';
                // }
            });
        ;
    };

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <Card sx={{ width: 345, height: 250 }}>
                <CardHeader title='Создать директорию' />
                <Divider />
                <CardContent>
                    <TextField
                        value={name}
                        onChange={handleOnChangeName}
                        variant='filled'
                        label='Название директории'
                        fullWidth
                    />
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
