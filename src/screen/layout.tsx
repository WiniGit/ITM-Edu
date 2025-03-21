import { CSSProperties, MouseEventHandler, ReactNode, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { PageByUrl, useLocation } from 'wini-web-components'

export const PageView = ({ childrenData = {}, itemData = {}, propsData = {} }: {
    childrenData?: { [p: string]: ReactNode },
    itemData?: { [p: string]: ReactNode },
    propsData?: { [p: string]: { [p: string]: any; style?: CSSProperties; className?: string; onCLick?: (ev: MouseEventHandler) => void; } }
}) => {
    const methods = useForm({ shouldFocusError: false })
    const location = useLocation()
    // router custom UI

    useEffect(() => {
        // const controller = new DataController("Course")
        // BaseDA.uploadFiles()
    }, [])

    return <PageByUrl
        url={location.pathname}
        methods={methods}
        childrenData={childrenData}
        itemData={itemData}
        propsData={propsData}
    />
}