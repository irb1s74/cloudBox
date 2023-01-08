import { FC, useRef } from 'react'
import { HiCloudUpload, HiOutlinePlus } from 'react-icons/hi'
import { useSearchParams } from 'react-router-dom'
import classNames from 'classnames'
import styles from '../Sidebar.module.scss'

interface SidebarButtonsProps {
  className?: string
}

export const SidebarButtons: FC<SidebarButtonsProps> = ({ className }) => {
  const [usePath] = useSearchParams()
  // const [uploadFile] = fileAPI.useUploadFileMutation();

  const handleOpenCreateDirModal = () => {
    // setModal({ id: EModal.createDir, type: EModal.createDir, option: {} });
  }
  const files = useRef(document.createElement('input'))

  const handleUpdateFiles = () => {
    const path = usePath.get('path')
    if (files.current.files && files.current.files.length) {
      Array.from(files.current.files).forEach(async (file) => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('path', path || '')
        // await uploadFile({
        //     token: user.token,
        //     formData,
        // });
      })
    }
  }

  const handleSelectFiles = () => {
    files.current.click()
  }
  return (
    <div className={classNames(styles.SidebarWrapperButtons, {}, [className])}>
      <button
        type="button"
        onClick={handleSelectFiles}
        className={classNames(styles.SidebarButton, ['btn-reset', styles.SidebarButton__accent])}
      >
        <HiCloudUpload className={styles.SidebarBtnIcon} size={25} />
        Загрузить
        <input
          ref={files}
          type='file'
          multiple
          onChange={handleUpdateFiles}
          hidden
        />
      </button>
      <button
        onClick={handleOpenCreateDirModal}
        className={classNames(styles.SidebarButton, ['btn-reset'])}
        type="button"
      >
        <HiOutlinePlus className={styles.SidebarBtnIcon} size={25} />
        Создать
      </button>
    </div>
  )
}
