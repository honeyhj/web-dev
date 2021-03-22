import React, { Component } from "react";
import CKEditor from "react-ckeditor-component";
import { Multiselect } from "multiselect-react-dropdown";
import Dropzone from "react-dropzone";
import axios from "axios";
import URL, { sub } from "../User/Url";
export default class Uploadproduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      sub: [],
      data: [],
      brands: [{ name: "Apple" }, { name: "Iphone" }, { name: "Shaomi" }],
      Images: [],
      title: "",
      skunumber: "",
      description: "",
      price: "",
      quantity: "",
      weaight: "",
      category: "",
      subcategory: "",
      brand: "",
      discount: "",
      stock: "",
      shippingdetails: "",
      manufacturesdetails: "",
      selectedsize: [],
      feature: false,
      trend: false,
      available: [{ name: "L" }, { name: "X" }, { name: "M" }],
      image: "",
    };
  }

  // onDrop = (files) => {
  //   console.log(files[0]);

  //   let formData = new FormData();
  //   const config = {
  //     header: { "content-type": "multipart/form-data" },
  //   };
  //   formData.append("file", files[0]);
  //   //save the Image we chose inside the Node Server
  //   axios
  //     .post(`${URL}/uploadImage`, formData, config)
  //     .then((response) => {
  //       if (response.data.success) {
  //         this.setState({
  //           Images: [...this.state.Images, response.data.image],
  //         });
  //       } else {
  //         alert("Failed to save the Image in Server");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("hi");
  //       console.log(err);
  //     });
  // };
  category = (e,t) =>{
    console.log(t);
    this.state.data.map(item => {
      if(item.CategoryName === t.name && item.SubCategory.length > 0){
        const get = item.SubCategory.map(subCat =>{
          return(
            {name:subCat.Name}
          )
        })
        this.setState({sub:get,category:t.name})
      }
    })
    
  }
  subcategory = (e,t) =>{
        this.setState({subcategory:t.name})
  }


  // category = (selectedList, selectedItem) => {
  //   this.setState({ category: selectedItem.name })
  //   {
  //     this.state.data.map(item => {
  //       if (item.SubCategory.length > 0 && item.CategoryName === selectedItem.name) {
  //         const SubCategory = item.SubCategory.map(itemm => {
  //           return ({ name: itemm.Name })
  //         })

  //         this.setState({ sub: SubCategory });
  //       }
  //     })
  //   }
  // }
















  updateContent(newContent) {
    this.setState({
      content: newContent,
    });
  }
  onChangedes = (evt) => {
    console.log("onChange fired with event info: ", evt);
    var newContent = evt.editor.getData();
    this.setState({
      description: newContent,
    });
  };

  onChangeship = (evt) => {
    console.log("onChange fired with event info: ", evt);
    var newContent = evt.editor.getData();
    this.setState({
      shippingdetails: newContent,
    });
  };

  onChangemanu = (evt) => {
    console.log("onChange fired with event info: ", evt);
    var newContent = evt.editor.getData();
    this.setState({
      manufacturesdetails: newContent,
    });
  };

  onBlur(evt) {
    console.log("onBlur event called with event info: ", evt);
  }

  afterPaste(evt) {
    console.log("afterPaste event called with event info: ", evt);
  }
  onDelete = (image) => {
    const currentIndex = this.state.Images.indexOf(image);

    let newImages = [...this.state.Images];
    newImages.splice(currentIndex, 1);

    this.setState({ Images: newImages });
  };
  async componentDidMount() {
    await axios
      .get(`${URL}/getmenus`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        this.setState({ data: data.data });
        const category = data.data.map((item) => {
          return { name: item.CategoryName };
        });

        this.setState({ options: category });
      });
  }

  brand = (selectedList, selectedItem) => {
    this.setState({ brand: selectedItem.name });
  };

  onSelect = (selectedList, selectedItem) => {
    this.setState({ selectedsize: selectedList });
  };

  onChangeHandler = async (event) => {
    // console.log(event.target.files[0]);
    let formData = new FormData();
    formData.append("file", event.target.files[0]);

    const config = {
      header: { "content-type": "multipart/form-data" },
    };

    await axios
      .post(`${URL}/uploadImage`, formData, config)
      .then((response) => {
        console.log("kk", response);
        if (response.data.success) {
          this.setState({
            Images: [...this.state.Images, response.data.image],
          });
        } else {
          alert("Failed to save the Image in Server");
        }
      })
      .catch((err) => {
        console.log("hi");
        console.log(err);
      });
  };

  Change = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  trend = (e) => {
    this.setState({ trend: !this.state.trend });
  };
  feature = () => {
    this.setState({ feature: !this.state.feature });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {
      title,
      Images,
      skunumber,
      description,
      price,
      quantity,
      weaight,
      category,
      subcategory,
      brand,
      discount,
      stock,
      shippingdetails,
      manufacturesdetails,
      selectedsize,
      feature,
      trend,
    } = this.state;
    axios
      .post(
        `${URL}/uploadProduct`,
        {
          title,
          Images,
          skunumber,
          description,
          price,
          quantity,
          weaight,
          category,
          subcategory,
          brand,
          discount,
          stock,
          shippingdetails,
          manufacturesdetails,
          selectedsize,
          feature,
          trend,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        if (response.data.success) {
          alert("Successfully uploaded");
        } else {
          alert("Faild to upload");
        }
      });
  };
  render() {
    return (
      <div className="container">
        <div style={{ display: "flex", justifyContent: "center" }}>
          {/* <Dropzone onDrop={this.onDrop} multiple={false} maxSize={800000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "300px",
                  height: "240px",
                  border: "1px solid lightgray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                {...getRootProps()}
              >
                {console.log("getRootProps", { ...getRootProps() })}
                {console.log("getInputProps", { ...getInputProps() })}
                <input {...getInputProps()} />
                <i className="fa fa-plus" style={{ fontSize: "3rem" }}></i>
                <Icon type="plus" style={{ fontSize: "3rem" }} />
              </div>
            )}
          </Dropzone> */}

          <div
            style={{
              display: "flex",
              width: "350px",
              height: "240px",
              overflowX: "scroll",
            }}
          >
            {this.state.Images.map((image, index) => (
              <div onClick={() => this.onDelete(image)}>
                <img
                  style={{ minWidth: "300px", width: "300px", height: "240px" }}
                  src={`http://localhost:5000/${image}`}
                  alt={`productImg-${index}`}
                />
              </div>
            ))}
          </div>
        </div>
        {/* {this.state.Images.map((image, index) => (
          <div onClick={() => this.onDelete(image)}>
            <img
              style={{ minWidth: "300px", width: "300px", height: "240px" }}
              src={`/${image}`}
              alt={`productImg-${index}`}
            />
          </div>
        ))} */}

        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Select Image</label>

            <input type="file" name="file" onChange={this.onChangeHandler} />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Title</label>
            <input
              type="text"
              name="title"
              onChange={this.Change}
              value={this.state.title}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">SKU Number</label>
            <input
              type="text"
              name="skunumber"
              onChange={this.Change}
              value={this.state.skunumber}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Discription</label>

            <CKEditor
              activeClass="p10"
              content={this.state.description}
              value={this.state.description}
              events={{
                blur: this.onBlur,
                afterPaste: this.afterPaste,
                change: this.onChangedes,
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Price</label>
            <input
              type="text"
              name="price"
              onChange={this.Change}
              value={this.state.price}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Price"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Quantity</label>
            <input
              type="text"
              name="quantity"
              onChange={this.Change}
              value={this.state.quantity}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Quantity"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Weaight</label>
            <input
              type="text"
              name="weaight"
              onChange={this.Change}
              value={this.state.weaight}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Quantity"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Select Category</label>
            <Multiselect
              options={this.state.options} // Options to display in the dropdown
              selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
              onSelect={this.category} // Function will trigger on select event
              onRemove={this.onRemove} // Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
              singleSelect="true"
            />
          </div>
          {this.state.sub.length > 0 && (
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Select Sub Category</label>
              <Multiselect
                options={this.state.sub} // Options to display in the dropdown
                selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                onSelect={this.subcategory} // Function will trigger on select event
                onRemove={this.onRemove} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
                singleSelect="true"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Select Brand</label>
            <Multiselect
              options={this.state.brands} // Options to display in the dropdown
              selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
              onSelect={this.brand} // Function will trigger on select event
              onRemove={this.onRemove} // Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
              singleSelect="true"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Discount</label>
            <input
              type="text"
              name="discount"
              onChange={this.Change}
              value={this.state.discount}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Discount"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Stock</label>
            <input
              type="text"
              name="stock"
              onChange={this.Change}
              value={this.state.stock}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Stock"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Shipping DEtails</label>

            <CKEditor
              activeClass="p10"
              content={this.state.shippingdetails}
              events={{
                blur: this.onBlur,
                afterPaste: this.afterPaste,
                change: this.onChangeship,
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Manufactures DEtails</label>

            <CKEditor
              activeClass="p10"
              content={this.state.manufacturesdetails}
              events={{
                blur: this.onBlur,
                afterPaste: this.afterPaste,
                change: this.onChangemanu,
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Select availabel Size</label>
            <Multiselect
              options={this.state.available} // Options to display in the dropdown
              selectedValues={this.state.selectedsize} // Preselected value to persist in dropdown
              onSelect={this.onSelect} // Function will trigger on select event
              onRemove={this.onRemove} // Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
            />
          </div>

          <div className="form-check">
            <input
              type="checkbox"
              name="featured"
              onChange={this.feature}
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Is Feature?
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              name="trend"
              onChange={this.trend}
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Is Trend?
            </label>
          </div>

          <div></div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
