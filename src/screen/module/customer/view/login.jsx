import { signInWithPopup, OAuthProvider } from "@firebase/auth";
import { useGoogleLogin } from "@react-oauth/google";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form"
import { useLocation, PageByUrl, AccountController, Util, ToastMessage, Text, TextFieldForm, Winicon } from "wini-web-components"
import { auth } from "../../../../firebase";
import config from "../../../../config";
import { CustomerActions } from '../reducer';
import { useDispatch } from "react-redux";

export default function LoginView() {
    const methods = useForm({ shouldFocusError: false })
    const location = useLocation()
    const account = new AccountController();
    const dispatch = useDispatch();

    const handleLoginResponse = async (res) => {
      if (res.code !== 200) ToastMessage.errors(res.message);
      else {
        ToastMessage.success("Login successfully!");
        Object.keys(res.data).forEach((key) => {
          Util.setCookie(key, res.data[key]);
        });
        Util.setCookie("timeRefresh", Date.now() / 1000 + 9 * 60);

        window.location.replace("/");
      }
    };

    const onSubmit = async (ev, methods) => {
      const res = await AccountController.login(ev);
      if (res.code === 403)
        methods.setError("Password", { message: res.message });
      else handleLoginResponse(res);
    };
    
    const handleForgotPassword = async () => {

    }

    const handleAppleLogin = async () => {
      try {
        // Tạo provider cho Apple
        const provider = new OAuthProvider("apple.com");

        await signInWithPopup(auth, provider).then(async (rs) => {
          debugger;
          const credential = OAuthProvider.credentialFromResult(rs);
          const idToken = credential.idToken;
          console.log("Firebase ID Token:", idToken);
          const res = await account.login({
            type: "apple",
            token: idToken,
          });
          handleLoginResponse(res);
        });
      } catch (error) {
        console.error("Lỗi đăng nhập Apple:", error.code, error.message);
      }
    };
   

    // router custom UI
    const customUI = useMemo(() => {
        switch (location.pathname) {
            case "/login":
                return {
                    itemData: {
                        "ba9760a2dbaf4f2ca5c89856b33817f7": <div className='col' style={{gap : "2rem"}}>
                            <TextFieldForm
                                className='col label-3'
                                name='emailPhone'
                                label='Số điện thoại hoặc Email'
                                placeholder='Email/Phone'
                                prefix={<Winicon
                                    src={"outline/user interface/mail"}
                                    size={"1.6rem"}
                                />}
                                methods={methods}
                                style={{gap : "0.8rem"}}
                            />
                            <TextFieldForm
                                className='col label-3'
                                label='Mật khẩu'
                                name='password'
                                placeholder='Password'
                                prefix={<Winicon
                                    src={"outline/user interface/lock"}
                                    size={"1.6rem"}
                                />}
                                type='password'
                                methods={methods}
                                style={{gap : "0.8rem"}}
                            />
                            <Text 
                                className="button-text-3"
                                onClick={handleForgotPassword}
                                style={{color :"var(--neutral-text-subtitle-color)"}}    
                            > 
                                Quên mật khẩu?
                            </Text>
                        </div>,
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

    return (
      <PageByUrl
        url={location.pathname}
        methods={methods}
        {...customUI}
        propsData={{
          "5ba93e258a764ab3b8e3361dd3765f14": {
            onClick: useGoogleLogin({
              onSuccess: async ({ code }) => {
                const res = await account.login({
                  type: "google",
                  ggClientId: config.ggClientId,
                  token: code,
                });
                handleLoginResponse(res);
              },
              onError: (er) => {
                ToastMessage.errors(er.error_description);
              },
              flow: "auth-code",
              scope: "https://www.googleapis.com/auth/userinfo.email",
            }),
          },
          "942575aceaa0499581ce05d6a46d6ea5": {
            onClick: methods.handleSubmit(onSubmit),
          },
          "f4e2ecfb1f33490895db576a902d40d2" : {
            onClick: handleAppleLogin
          }
        }}
      />
    );
}