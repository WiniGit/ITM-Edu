import { Popup } from "wini-web-components";
import { PageView } from "../../layout";
import { useRef } from "react";

export default function CourseView() {
    const popupRef = useRef()
    
    return <>
        <Popup ref={popupRef} />
        <PageView

        />
    </>
}