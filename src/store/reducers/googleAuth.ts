export const googleAuthSignUp = () => {
    window.open(
        `${process.env.REACT_APP_API_PATH}/auth/google`,
        "_self",
        "width=500,height=600"
    )
}