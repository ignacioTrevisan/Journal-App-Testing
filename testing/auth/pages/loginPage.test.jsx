import { render } from "@testing-library/react"
import { LoginPage } from "../../../src/auth/pages/loginPage"


describe('Pruebas a <LoginPage />', () => {
    test('Debe mostrar el componente correctamente', () => {

        render(<LoginPage />)
    })
})