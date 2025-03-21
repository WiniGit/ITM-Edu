import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { PageByUrl, TextField, useLocation } from 'wini-web-components'

export const PageView = () => {
    const methods = useForm({ shouldFocusError: false })
    const location = useLocation()
    // router custom UI
    const customUI = useMemo(() => {
        switch (location.pathname) {
            case "/login":
                return {
                    childrenData: {
                        "78deea3617a84639920b0f7109d19a33": <>
                            <TextField
                                placeholder='Email/Phone'
                            />
                            <TextField
                                placeholder='Password'
                            />
                        </>
                    },
                }
            case "/course":
                return {}
            default:
                return {}
        }
    }, [location.pathname])

    useEffect(() => {
        // const controller = new DataController("Course")
        // BaseDA.uploadFiles()
    }, [])

    return <PageByUrl
        url={location.pathname}
        methods={methods}
        {...customUI}
    />
}