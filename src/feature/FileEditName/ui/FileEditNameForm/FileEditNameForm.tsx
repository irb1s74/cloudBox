import { ChangeEvent, FC, memo, useState } from 'react';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    IconButton,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { IoClose } from 'react-icons/io5';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { IFile, useRenameFileMutation } from 'entities/File';
import { fileEditNameReducer, fileEditNameActions } from '../../model/slice/FileEditNameSlice';
import { getFileEditNameFileName } from '../../model/selectors/getFileEditNameFileName/getFileEditNameFileName';

const initialReducers: ReducersList = {
    fileEditName: fileEditNameReducer,
};

interface RenameFileFormProps {
    file: IFile;
    handleCloseModal: () => void;
}

const FileEditNameForm: FC<RenameFileFormProps> = (props) => {
    const { file, handleCloseModal } = props;
    const dispatch = useAppDispatch();
    const name = useSelector(getFileEditNameFileName);
    const [renameError, setRenameError] = useState('');
    const [renameFile, { data, error, isLoading }] = useRenameFileMutation();

    const handleOnChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(fileEditNameActions.setFileName(event.target.value));
    };

    const handleOnClick = () => {
        renameFile({ fileName: name, id: file.id })
            .unwrap()
            .then(() => {
                handleCloseModal();
            })
            .catch((error) => {
                if (error.status === 400) {
                    setRenameError('Файл с таким именем уже существует');
                }
            });
    };

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <Card sx={{ width: 385 }}>
                <Stack
                    sx={{ p: '16px' }}
                    direction='row'
                    alignItems='center'
                    justifyContent='space-between'
                >
                    <Typography variant='h5'>Переименовать файл</Typography>
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
                        label='Название'
                        fullWidth
                    />
                    {renameError && (
                        <Typography textAlign='center' color='error'>
                            {renameError}
                        </Typography>
                    )}
                </CardContent>
                <CardActions>
                    <Button
                        onClick={handleOnClick}
                        disabled={isLoading}
                        variant='contained'
                        fullWidth
                    >
                        Переименовать
                    </Button>
                </CardActions>
            </Card>
        </DynamicModuleLoader>
    );
};

export default memo(FileEditNameForm);
