import React, { Component } from "react";
import { Dropdown } from "../StyledComponents/Dropdown";
import { arrTheme } from "../Theme/ThemeManager";
import { actionChangeTheme, actionThemSinhVien, actionTimKiem, actionUpdate } from "../redux/actions/FormActions";
import { PrimaryTheme } from "../Theme/PrimaryTheme";
import { P } from "../StyledComponents/P";
import { LightTheme } from "../Theme/LightTheme";
import { DarkTheme } from "../Theme/DarkTheme";
import { H2 } from "../StyledComponents/H2";
import { TextField } from "../StyledComponents/TextField";
import { Button } from "../StyledComponents/Button";
import { connect } from "react-redux";
import { debounce } from "lodash";
class FormSinhVien extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {
                ma: "",
                hoTen: "",
                soDienThoai: "",
                email: "",
            },
            errors: {
                ma: "",
                hoTen: "",
                soDienThoai: "",
                email: "",
            },
            disabled: false
        };

    }

    renderTheme = () => {
        return arrTheme.map((theme, index) => {
            return (
                <option key={index.toString() + theme.id} value={theme.id}>
                    {theme.name}
                </option>
            );
        });
    };
    handleChangeTheme = (event) => {
        this.props.dispatch(actionChangeTheme(event.target.value));
    };
    handleChangeInput = (event) => {
        let { name, value, type, pattern } = event.target;
        // ! valid thông tin

        ////!valid rỗng
        if (value == '') {
            this.state.errors[name] = name + " Không được rỗng";
        } else {
            this.state.errors[name] = "";
        }
        ////!valid định dạng
        let re = new RegExp(pattern);
        if (!value.toLowerCase().match(re)) {
            this.state.errors[name] = name + " Sai định dạng";
        } else {
            this.state.errors[name] = ""
        }


        // ! tạo ra biến mới cho state để gán
        let values = { ...this.state.values, [name]: value };
        // ! lấy thông tin sau khi valid
        this.setState({
            values: values
        })


    };
    validUser = () => {
        // ! đẩy lên reducer
        let isValid = true;
        let values = this.state.values;
        let errors = this.state.errors;
        // ! nếu values nhập vào là rỗng
        for (let key in values) {
            if (values[key] == "") {
                isValid = false;
            }
        }
        // ! nếu error là có thì cũng là false
        for (let key in errors) {
            if (errors[key] !== "") {
                isValid = false;
            }
        }
        return isValid;
    }
    handleThemSinhVien = () => {
        let isValid = this.validUser();
        if (!isValid) return alert("Vui lòng nhập đầy đủ");

        // ! xử lí khi đã valid xong
        let newObject = this.state.values;
        this.setState({
            ...this.state, values: {
                ma: "",
                hoTen: "",
                soDienThoai: "",
                email: ""
            }
        }, () => {
            // ! hàm này bất đồng bộ
            this.props.dispatch(actionThemSinhVien(newObject));
        })
    }
    handleUpdateSinhVien = () => {
        let isValid = this.validUser();
        if (!isValid) return alert("Vui lòng nhập đầy đủ");
        let myValues = this.state.values;
        this.setState({
            ...this.state, values: {
                ma: "",
                hoTen: "",
                soDienThoai: "",
                email: ""
            }
        }, () => {
            this.props.dispatch(actionUpdate(myValues));
        })


    }



    handleInputDebounce = (event) => {
        debounce(
            this.searchInput(event)
            , 100)
    }
    searchInput = (event) => {
        let { value } = event.target;
        this.props.dispatch(actionTimKiem(value))
    }


    render() {
        return (
            <>
                <div>
                    <div className="row justify-content-between mx-2">
                        <div>
                            <H2>Thông tin sinh viên</H2>
                        </div>
                        <div>
                            <Dropdown onChange={this.handleChangeTheme} className="rounded">
                                {this.renderTheme()}
                            </Dropdown>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <TextField
                                label="Mã SV"
                                className="rounded my-2"
                                type="text"
                                onChange={this.handleChangeInput}
                                value={this.state.values.ma}
                                name="ma"
                                loi={this.state.errors.ma}
                                pattern="^([1-9][0-9]{0,2}|1000)$"
                            />
                            <TextField
                                label="Số điện thoại"
                                className="rounded my-2"
                                onChange={this.handleChangeInput}
                                value={this.state.values.soDienThoai}
                                name="soDienThoai"
                                loi={this.state.errors.soDienThoai}
                                type="number"
                                pattern="(84|0[3|5|7|8|9])+([0-9]{8})\b"

                            />
                        </div>
                        <div className="col-6">
                            <TextField
                                label="Họ tên"
                                className="rounded my-2"
                                type="text"
                                onChange={this.handleChangeInput}
                                value={this.state.values.hoTen}
                                name="hoTen"
                                loi={this.state.errors.hoTen}
                                pattern="[^a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]"
                            />
                            <TextField
                                label="Email"
                                className="rounded my-2"
                                onChange={this.handleChangeInput}
                                value={this.state.values.email}
                                name="email"
                                loi={this.state.errors.email}
                                pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
                            />
                        </div>
                    </div>
                    <div className="row mx-2">
                        <Button
                            disabled={this.props.disabled}
                            className="btn btn-success "
                            onClick={() => {
                                this.handleThemSinhVien()
                            }}
                        >Thêm sinh viên</Button>
                        <Button
                            disabled={!this.props.disabled}
                            className="btn btn-success mx-2"
                            onClick={() => {
                                this.handleUpdateSinhVien()
                            }}
                        >Cập nhật</Button>
                    </div>
                </div>
                <div className="my-2 row flex-column align-items-center">
                    <p style={{
                        fontSize: "1.5rem"
                    }}>Tìm theo tên</p>
                    <input
                        type="text"
                        className="w-50 rounded border border-success py-2 px-2"
                        onChange={(event) => {
                            this.handleInputDebounce(event)
                        }}
                    />
                </div>
            </>
        );
    }
    componentDidUpdate(prevProps) {
        if (prevProps.sinhVienEdit.ma !== this.props.sinhVienEdit.ma) {
            this.setState({
                ...this.state, values: this.props.sinhVienEdit
            })
        }
    }
}
const mapStateToProps = (state) => ({
    sinhVienEdit: state.FormReducer.sinhVienEdit,
    disabled: state.FormReducer.disabled
})

export default connect(mapStateToProps)(FormSinhVien);
