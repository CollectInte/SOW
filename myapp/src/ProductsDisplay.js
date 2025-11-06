import React, { useState, useEffect } from "react";
import "./ProductsDisplay.css";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import PrintIcon from "@mui/icons-material/Print";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ProductsDisplay = () => {
  const [products, setProducts] = useState([]);
  const fetchproducts = async () => {
    try {
      const response = await fetch("http://localhost:8000/articles");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchproducts();
  }, []);
  return (
    <>
      <div className="productstable">
        <div className="displayproducts">
          <div className="searchdivision">
            <div>
              <input
                type="text"
                placeholder="Search Articleno"
                className="searchbox"
              />
              <SearchIcon />
              <br />
              <input
                type="text"
                placeholder="Search Product"
                className="searchbox"
              />
              <SearchIcon />
            </div>
            <div className="productbtns">
              <button className="addproductbtn">
                New Product <AddIcon />
              </button>
              <button className="addproductbtn">
                Print List <PrintIcon />
              </button>
              <button className="addproductbtn">
                Advanced Mode <VisibilityIcon />
              </button>
            </div>
          </div>
          <div className="producttable">
            <table width="95%">
              <thead>
                <tr>
                  <th className="tableheading">Article No</th>
                  <th className="tableheading">Product Name</th>
                  <th className="tableheading">In Price</th>
                  <th className="tableheading">Price</th>
                  <th className="tableheading">Unit</th>
                  <th className="tableheading">Stock</th>
                  <th className="tableheading">Description</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.articleno}
                  >
                    <td className="tableitem"><button className="itembtn">{product.articleno}</button></td>
                    <td className="tableitem"><button className="itembtn">{product.product}</button></td>
                    <td className="tableitem"><button className="itembtn">{product.inprice}</button></td>
                    <td className="tableitem"><button className="itembtn">{product.price}</button></td>
                    <td className="tableitem"><button className="itembtn">{product.unit}</button></td>
                    <td className="tableitem"><button className="itembtn">{product.instock}</button></td>
                    <td className="tableitem"><button className="itembtn">{product.description}</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductsDisplay;
