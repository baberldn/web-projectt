import { FaUser, FaLock } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useState } from 'react'


const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch('/users.json')
      const data = await response.json()
      
      const localUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
      const allUsers = [...data.users, ...localUsers]
      
      const userExists = allUsers.some(user => user.username === formData.username)
      
      if (userExists) {
        alert('Bu kullanıcı adı zaten kullanılıyor!')
        return
      }

      const newUser = {
        id: allUsers.length + 1,
        ...formData
      }
      
      const updatedUsers = [...localUsers, newUser]
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers))
      
      alert('Kayıt başarılı!')
      navigate('/')
      
    } catch (error) {
      console.error('Bir hata oluştu:', error)
      alert('İşlem sırasında bir hata oluştu!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="image-container">
        <img 
          src="images/image2.png" 
          alt="Register Cover" 
          className="cover-image"
        />
      </div>

      <div className="form-container">
        <div className="form-wrapper">
          <h2 className="title">Kayıt Ol</h2>
          
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label className="label"></label>
              <div className="input-wrapper">
                <FaUser className="icon" />
                <input 
                  type="text" 
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="input"
                  placeholder="Kullanıcı Adı"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="label"></label>
              <div className="input-wrapper">
                <FaUser className="icon" />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input"
                  placeholder="E-posta"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="label"></label>
              <div className="input-wrapper">
                <BsFillTelephoneFill className="icon" />
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input"
                  placeholder="Telefon Numarası"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="label"></label>
              <div className="input-wrapper">
                <FaLock className="icon" />
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input"
                  placeholder="Şifre"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="submit-button"
            >
              {loading ? 'İşlem yapılıyor...' : 'Kayıt Ol'}
            </button>
          </form>

          <p className="login-text">
            Zaten hesabınız var mı?
            <button 
              onClick={() => navigate('/')}
              className="login-link"
            >
              Giriş Yap
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register