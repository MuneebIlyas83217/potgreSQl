import API from '../API'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function Form() {
    const navigate = useNavigate()
    const [form, setform] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handlechange = (e) => {
        const { name, value } = e.target
        setform({

            ...form,
            [name]: value
        })
    }
    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await API.post("/", form)
            console.log("Registered:", res.data)
            alert("User created successfully")
            setform({
                name: "",
                email: "",
                password: ""
            })
            navigate("/")
        } catch (error) {
            console.error("Registration error:", error)
            const detail = error.response?.data?.error 
                || (error.code === "ERR_NETWORK" ? "Cannot reach the API server. Check your connection and the VITE_API_URL setting." : error.message)
                || "Failed to register"
            alert(`Failed to register: ${detail}`)
        }
    }

    return (
        <div className='flex w-full h-screen items-center justify-center' >
            <form onSubmit={handlesubmit} className='flex gap-2 flex-col border rounded-xl p-6 shadow-lg text-lg w-[360px]' >
                <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handlechange}
                    className='p-2 border rounded-xl'
                    type="text"
                    placeholder='Your Name'
                    required
                />

                <input
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handlechange}
                    className='p-2 border rounded-xl'
                    type="email"
                    placeholder='example@gmail.com'
                    required
                />

                <input
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handlechange}
                    className='p-2 border rounded-xl'
                    type="password"
                    placeholder='Password'
                    required
                />
                <button type='submit' className='p-2 border rounded-xl bg-[#0189CF] text-white cursor-pointer' >Submit</button>
                
                  </form>

        </div>
    )
}

export default Form