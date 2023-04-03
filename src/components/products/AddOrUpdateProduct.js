import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCategories } from "../../redux/actions/categoryActions";
import { saveProduct } from "../../redux/actions/productActions";
import ProductDetail from "./ProductDetail";
import { useParams,useNavigate } from "react-router-dom";

function AddOrUpdateProduct({
  products,
  categories,
  getProducts,
  getCategories,
  saveProduct,
  ...props
}) {
  const navigate = useNavigate();
  const {productId} =useParams();
  const  [product, setProduct]  = useState({ ...props.product });
  const [errors,setErrors] = useState({});
  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
    setProduct({ ...props.product });
  }, [categories.length,getCategories,props.product]);

  function handleChange(event) {
    const { name, value } = event.target;
    setProduct((previousProduct) => ({
      ...previousProduct,
      [name]: name === "categoryId" ? parseInt(value, 10) : value,
    }));
    validate(name,value);
    
  }

  function validate(name,value){
    if (name==="productName"&&value==="") {
      setErrors(previousErrors =>({...previousErrors,productName:"Product name is required"}))
    }
    else{
      setErrors(previousErrors =>({...previousErrors,productName:""}))
    }

    if (name==="categoryId"&&value==="") {
      setErrors(previousErrors =>({...previousErrors,categoryId:"Unit Price is required"}))
    }
    else{
      setErrors(previousErrors =>({...previousErrors,categoryId:""}))
    }

    if (name==="unitPrice"&&value==="") {
      setErrors(previousErrors =>({...previousErrors,unitPrice:"Unit Price is required"}))
    }
    else{
      setErrors(previousErrors =>({...previousErrors,unitPrice:""}))
    }

    if (name==="quantityPerUnit"&&value==="") {
      setErrors(previousErrors =>({...previousErrors,quantityPerUnit:"Quantity is required"}))
    }
    else{
      setErrors(previousErrors =>({...previousErrors,quantityPerUnit:""}))
    }

    if (name==="unitsInStock"&&value==="") {
      setErrors(previousErrors =>({...previousErrors,unitsInStock:"Units in Stock is required"}))
    }
    else{
      setErrors(previousErrors =>({...previousErrors,unitsInStock:""}))
    }
  }

  function handleSave(event) {
    event.preventDefault();
    saveProduct(product).then(()=>
    navigate("/"));
  }

  return (
    <ProductDetail
      product={product}
      categories={categories}
      onChange={handleChange}
      onSave={handleSave}
      errors = {errors}
    />
  );
}

const mapDispatchToProps = {
  getCategories,
  saveProduct,
};

function mapStateToProps(state) {
  const product = state.productListReducer.find((product) => product.id.toString() === useParams().productId) || {};
  return {
    product,
    products: state.productListReducer,
    categories: state.categoryListReducer,
  };
  
}

export default connect(mapStateToProps, mapDispatchToProps)(AddOrUpdateProduct);
