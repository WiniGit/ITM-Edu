import { CSSProperties, forwardRef, MouseEventHandler, ReactNode, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Button, closePopup, PageByUrl, Popup, showPopup, Switch, Text, useLocation, Util, Winicon } from 'wini-web-components'

export const PageView = ({ childrenData = {}, itemData = {}, propsData = {} }: {
    childrenData?: { [p: string]: ReactNode },
    itemData?: { [p: string]: ReactNode },
    propsData?: { [p: string]: { [p: string]: any; style?: CSSProperties; className?: string; onCLick?: (ev: MouseEventHandler) => void; } }
}) => {
    const methods = useForm({ shouldFocusError: false })
    const location = useLocation()
    const popupRef = useRef<any>(null)
    
 
    useEffect(() => {
        // const controller = new DataController("Course")
        // BaseDA.uploadFiles()
    }, [])

    return <>
        <Popup ref={popupRef} />
        <PageByUrl
            url={location.pathname}
            methods={methods}
            childrenData={childrenData}
            itemData={itemData}
            propsData={{
                "911582cc9fd24c968895a4fa5dd10899": {
                    onClick: (ev: any) => {
                        const _box = ev.target.getBoundingClientRect()
                        showPopup({
                            ref: popupRef,
                            hideOverlay: true,
                            content: <PopupUserActions
                                ref={popupRef}
                                style={{ top: `${_box.y + _box.height + 2}px`, right: `${document.body.offsetWidth - _box.right}px` }}
                            />
                        })
                    },
                },
                ...propsData,
            }}
        /></>
}

const PopupUserActions = forwardRef(function PopupUserActions({ style = {} }: { style: CSSProperties }, ref: any) {
    // const user = useSelector((store) => store.customer.data)

    const handleLogout = () => {
        Util.clearCookie()
        window.location.replace("/login")
    }

    return <div className={`col popup-actions account-actions dropdown-popup`} style={{ ...style, width: 'fit-content', minWidth: "26rem" }}>
        <div className='row' style={{ padding: "1rem 1.6rem", gap: "0.8rem", borderBottom: "var(--neutral-main-border)" }}>
            {/* <CustomerAvatar /> */}
            <div className='col' style={{ gap: 2 }}>
                <Text className='label-3'>user?.Name</Text>
                <Text className='subtitle-4'>user?.Email ?? user?.Username</Text>
            </div>
        </div>
        <div className='col' style={{ padding: "0.6rem 0.8rem" }}>
            <button className='row' style={{ gap: '1.2rem', padding: '1.2rem' }}>
                <Winicon src='outline/users/user-c-frame' />
                <Text className='label-3'>Profile</Text>
            </button>
            <button className='row' style={{ gap: '1.2rem', padding: '1.2rem' }}>
                <Winicon src='outline/user interface/gear' />
                <Text className='label-3'>Setting</Text>
            </button>
        </div>
        <div className='col' style={{ padding: "1rem 0.8rem", borderTop: "var(--neutral-main-border)", gap: "0.8rem", alignItems: "center" }}>
            <label className='row' style={{ gap: "0.8rem", padding: "1rem 1.2rem", width: "100%" }}>
                <Winicon src='outline/weather/moon' />
                <Text className='label-3' style={{ flex: 1 }}>Dark mode</Text>
                <Switch size={"2rem"} value={document.documentElement.classList.contains("dark")} onChange={(ev) => {
                    if (ev) document.documentElement.classList.add("dark")
                    else document.documentElement.classList.remove("dark")
                }} />
            </label>
            <Button
                label='Logout'
                className='button-text-3 neutral-button border'
                style={{ width: "calc(100% - 1.6rem)" }}
                onClick={() => {
                    handleLogout();
                    closePopup(ref)
                    // CustomerActions.logout()
                }}
            />
        </div>
    </div>
})