import React from "react";
import "./Products.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';
import ArticleIcon from '@mui/icons-material/Article';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import LogoutIcon from '@mui/icons-material/Logout';

const Products=()=>{
    return(
        <>
        <div className="products">
            <div className="menu">
                <h4 className="text-center">Menu</h4>
                <hr style={{ color: "#007bff", height: "2px", border: "none", backgroundColor: "#007bff" }} />
                <p><DescriptionIcon/> Invoices</p>
                <p><AccountCircleIcon/> Customers</p>
                <p><SettingsIcon/> My Business</p>
                <p><ArticleIcon/> Invoice Journal</p>
                <p className="bg-primary text-white"><LocalOfferIcon/> Price List</p>
                <p><FileCopyIcon/> Multiple Invoices</p>
                <p><LogoutIcon/> Logout</p>
            </div>
        </div>
        </>
    )
}
export default Products;