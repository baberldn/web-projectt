import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from 'react'


const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
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
      
      const user = allUsers.find(
        user => 
          user.username === formData.username && 
          user.password === formData.password
      )
      
      if (user) {
        alert('Başarıyla giriş yapıldı!')
        localStorage.setItem('currentUser', JSON.stringify(user))
        navigate('/dashboard')
      } else {
        alert('Kullanıcı adı veya şifre hatalı!')
      }
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
          src="images/image1.png" 
          alt="Login Cover" 
          className="cover-image"
        />
      </div>

      <div className="form-container">
        <div className="form-wrapper">
          <h2 className="title">Giriş Yap</h2>
          
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

            <div className="terms-group">
              <input 
                type="checkbox" 
                id="terms"
                name="terms"
                required
                className="terms-checkbox"
              />
              <label htmlFor="terms" className="terms-label">
                Giriş yaparak şartları ve koşulları kabul ediyorum
              </label>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="submit-button"
            >
              {loading ? 'İşlem yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>

          <p className="register-text">
            <button 
              onClick={() => navigate('/register')}
              className="register-link"
            >
              Kayıt Ol
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home