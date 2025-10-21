import { useState } from 'react';
import './UserForm.css';

function UserForm({ onSubmit, onCancel, initialData = null }) {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    email: '',
    birthDate: '',
    city: '',
    state: '',
    country: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.birthDate) {
      newErrors.birthDate = 'Birth date is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    if (!initialData && !formData.password) {
      newErrors.password = 'Password is required';
    } else if (!initialData && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
          placeholder="Enter full name"
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
          placeholder="email@example.com"
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="birthDate">Birth Date *</label>
        <input
          type="date"
          id="birthDate"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          className={errors.birthDate ? 'error' : ''}
        />
        {errors.birthDate && <span className="error-message">{errors.birthDate}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="city">City *</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={errors.city ? 'error' : ''}
            placeholder="City"
          />
          {errors.city && <span className="error-message">{errors.city}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="state">State *</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className={errors.state ? 'error' : ''}
            placeholder="State"
          />
          {errors.state && <span className="error-message">{errors.state}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="country">Country *</label>
        <input
          type="text"
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className={errors.country ? 'error' : ''}
          placeholder="Country"
        />
        {errors.country && <span className="error-message">{errors.country}</span>}
      </div>

      {!initialData && (
        <div className="form-group">
          <label htmlFor="password">Password *</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'error' : ''}
            placeholder="Enter password"
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>
      )}

      <div className="form-actions">
        <button
          type="button"
          className="cancel-btn"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : initialData ? 'Update User' : 'Create User'}
        </button>
      </div>
    </form>
  );
}

export default UserForm;
