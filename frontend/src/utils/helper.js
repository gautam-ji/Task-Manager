export const validateEmail = (email) => {
    const regex = /^[^\a@]+@[^\s@]+\.[^\s@]+$/

    return regex.test(email)
}