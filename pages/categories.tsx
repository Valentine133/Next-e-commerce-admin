import React, {useEffect, useState} from 'react';
import Layout from '@/components/Layout';
import axios from 'axios';
import { withSwal } from "react-sweetalert2";

function Categories({swal}) {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    axios.get("/api/categories").then((response) => {
      setCategories(response.data);
    });
  }

  async function saveCategory(e: { preventDefault: () => void; }) {
    e.preventDefault();
    const data = {
      name, 
      parentCategory, 
      properties: properties.map((property) => ({
        name: property.name, 
        values: property.values.split(',')
      })), 
    };
    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put("/api/categories", data);
      setEditedCategory(null);
    } else {
      await axios.post('/api/categories', data);
    }
    setName('');
    setParentCategory('');
    setProperties([]);
    fetchCategories();
  }

  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
    setProperties(
      category.properties.map(({name, values}) => ({
        name, 
        values: values.join(',')
      })
    ));
  }

  function delitCategory(category) {
   swal
     .fire({
       title: "Are you sure?",
       text: `Do you want to delete ${category.name}?`,
       showCancelButton: true,
       cancelButtonText: "Cancel",
       confirmButtonText: "Yes, delete it!",
       confirmButtonColor: "#d55",
       reverseButtons: true,
     })
     .then(async result => {
       if (result.isConfirmed) {
        const {_id} = category;
        await axios.delete(`/api/categories?_id=${_id}`);
        fetchCategories();
       }
     });
  }

  function addProperty() {
    setProperties(prev => {
      return [...prev, {name: '', value: ''}];
    });
  }

  function handlePropertyNameChange(index, property, newName) {
    setProperties(prev => {
      const newProperties = [...prev];
      newProperties[index].name = newName;
      return newProperties;
    });
  }

  function handlePropertyValuesChange(index, property, newValues) {
    setProperties((prev) => {
      const newProperties = [...prev];
      newProperties[index].values = newValues;
      return newProperties;
    });
  }

  function removeProperty(indexToRemove) {
    setProperties(prev => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  }

  return (
    <Layout>
      <h1>Categories</h1>

      <label className="text-lg">
        {editedCategory ? "Edit category" : "Create new category"}
      </label>
      <form onSubmit={saveCategory}>
        <div className="flex items-center gap-1">
          <input
            className="form-control"
            type="text"
            placeholder={"Category name"}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <select
            className="form-control"
            onChange={(e) => setParentCategory(e.target.value)}
            value={parentCategory}
          >
            <option value="">No parent category</option>
            {categories.length > 0 &&
              categories.map((category) => (
                <option value={category._id}>{category.name}</option>
              ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block">Properties</label>
          <button
            onClick={() => addProperty()}
            className="btn-secondary mb-2"
            type="button"
          >
            Add new property
          </button>
          {properties.length > 0 &&
            properties.map((property, index) => (
              <div className="flex gap-1 items-end mb-2">
                <label className="block mb-0">
                  <small>Property name</small>
                  <input
                    className="form-control mb-0"
                    type="text"
                    placeholder={"for example Color"}
                    onChange={(e) =>
                      handlePropertyNameChange(index, property, e.target.value)
                    }
                    value={property.name}
                  />
                </label>
                <label className="block mb-0">
                  <small>Property value</small>
                  <input
                    className="form-control mb-0"
                    type="text"
                    placeholder={"valus, comma, separated values"}
                    onChange={(e) =>
                      handlePropertyValuesChange(
                        index,
                        property,
                        e.target.value
                      )
                    }
                    value={property.values}
                  />
                </label>
                <button
                  onClick={() => removeProperty(index)}
                  className="btn-danger h-10"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            ))}
        </div>

        {editedCategory && (
          <button
            className="btn-danger me-2"
            type="button"
            onClick={() => {
              setEditedCategory(null), 
              setName(''), 
              setParentCategory(''),
              setProperties([])
            }}
          >
            Cancel
          </button>
          )}
        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>

      {!editedCategory && (
        <table className="basic mt-4">
          <thead>
            <tr>
              <td>Category name</td>
              <td>Parent category</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 &&
              categories.map((category) => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>{category?.parent?.name}</td>
                  <td className="flex gap-2">
                    <button
                      className="btn-accent"
                      onClick={() => editCategory(category)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 inline-block"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>
                    <button
                      className="btn-danger"
                      onClick={() => delitCategory(category)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 inline-block"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
};

export default withSwal (({swal}, ref) => (
  <Categories swal={swal}/>
));