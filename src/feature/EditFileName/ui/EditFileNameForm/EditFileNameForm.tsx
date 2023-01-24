import { ChangeEvent, FC, memo, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { IFile } from 'entities/File';
import { Form } from 'shared/ui/Form/Form';
import { useRenameFileMutation } from '../../api/renameFileRequest';
import {
    fileEditNameReducer,
    fileEditNameActions,
} from '../../model/slice/FileEditNameSlice';
import { getFileEditNameFileName } from '../../model/selectors/getFileEditNameFileName/getFileEditNameFileName';

const initialReducers: ReducersList = {
    fileEditName: fileEditNameReducer,
};

interface RenameFileFormProps {
    file: IFile;
    handleCloseModal: () => void;
}

const EditFileNameForm: FC<RenameFileFormProps> = (props) => {
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
            <Form
                titleForm="Переименовать файл"
                handleClose={handleCloseModal}
                error={renameError}
                actions={
                    <Button
                        onClick={handleOnClick}
                        disabled={isLoading}
                        variant="contained"
                        fullWidth
                    >
                        Переименовать
                    </Button>
                }
            >
                <TextField
                    value={name}
                    onChange={handleOnChangeName}
                    variant="outlined"
                    label="Название"
                    fullWidth
                />
            </Form>
        </DynamicModuleLoader>
    );
};

export default memo(EditFileNameForm);
