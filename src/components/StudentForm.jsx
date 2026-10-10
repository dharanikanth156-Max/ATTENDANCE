import { useState, useEffect } from "react";

const emptyForm = {
  rollNo: "",
  name: "",
  department: "",
  year: "",
  email: "",
  phone: "",
};

function StudentForm({ students, editingStudent, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  // Fill the form when editing, clear it when adding
  useEffect(() => {
    if (editingStudent) {
      setFormData(editingStudent);
    } else {
      setFormData(emptyForm);
    }
    setErrors({});
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    const roll = formData.rollNo.trim();

    if (!roll) {
      newErrors.rollNo = "Roll number is required";
    } else if (
      students.some(
        (s) => s.rollNo.toLowerCase() === roll.toLowerCase() && s.id !== formData.id
      )
    ) {
      newErrors.rollNo = "This roll number already exists";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!formData.department) newErrors.department = "Select a department";
    if (!formData.year) newErrors.year = "Select a year";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = "Phone must be exactly 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        rollNo: formData.rollNo.trim(),
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
      });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{editingStudent ? "✏️ Edit Student" : "➕ Add New Student"}</h3>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <div className="form-group">
              <label>Roll Number</label>
              <input name="rollNo" value={formData.rollNo} onChange={handleChange} placeholder="CS001" />
              {errors.rollNo && <span className="error-text">{errors.rollNo}</span>}
            </div>

            <div className="form-group">
              <label>Full Name</label>
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Student name" />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label>Department</label>
              <select name="department" value={formData.department} onChange={handleChange}>
                <option value="">Select department</option>
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="MECH">MECH</option>
                <option value="CIVIL">CIVIL</option>
              </select>
              {errors.department && <span className="error-text">{errors.department}</span>}
            </div>

            <div className="form-group">
              <label>Year</label>
              <select name="year" value={formData.year} onChange={handleChange}>
                <option value="">Select year</option>
                <option value="1">I Year</option>
                <option value="2">II Year</option>
                <option value="3">III Year</option>
                <option value="4">IV Year</option>
              </select>
              {errors.year && <span className="error-text">{errors.year}</span>}
            </div>

            <div className="form-group">
              <label>Email</label>
              <input name="email" value={formData.email} onChange={handleChange} placeholder="name@college.edu" />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input name="phone" value={formData.phone} onChange={handleChange} placeholder="10-digit number" maxLength={10} />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-light" onClick={onCancel}>Cancel</button>
            <button type="submit" className="btn btn-primary">
              {editingStudent ? "Update Student" : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentForm;