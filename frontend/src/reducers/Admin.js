import { createSlice, current } from "@reduxjs/toolkit"
const AdminSlice = createSlice(
    {
        name: 'Admin',
        initialState: {
            data: null
        },
        reducers: {
            login(currentState, { payload }) {
                currentState.adminToken = payload.adminToken
                currentState.data = payload.admin
                localStorage.setItem("admin", JSON.stringify(payload.admin));
                localStorage.setItem("adminToken", payload.adminToken)
            },
            logout(currentState) {
                currentState.data = null;
                localStorage.removeItem("admin")
            }
        }
    }
)

export const { login, logout } = AdminSlice.actions;
export default AdminSlice.reducer