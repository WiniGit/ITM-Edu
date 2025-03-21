import { useForm } from "react-hook-form"
import { useLocation, PageByUrl } from "wini-web-components"

export default function LoginView() {
    const methods = useForm({ shouldFocusError: false })
    const location = useLocation()

    return <PageByUrl
        url={location.pathname}
        methods={methods}
    />
}