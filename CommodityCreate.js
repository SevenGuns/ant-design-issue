import React, { Fragment } from "react";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import { Input, Radio, Button, Form, Divider } from "antd";
import pathToRegexp from "path-to-regexp";
import styles from "./styles.less";
// import { validateMoney } from "@/utils/validator";

const { Item: FormItem } = Form;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
@Form.create()
class CommodityCreate extends React.PureComponent {
  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 3 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    }
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  get isDetail() {
    const { location } = this.props;
    return pathToRegexp("/distribution/commodity/detail/:id?").exec(
      location.pathname
    );
  }

  get recordId() {
    const { computedMatch = {} } = this.props;
    const { id } = computedMatch.params || {};
    console.warn(id, "id");
    return id;
  }

  validateMoney = (rule, value, callback) => {
    console.log("lkk", value);
    if (!value) {
      callback();
      return;
    }
    // if (!validateMoney(value)) {
    //   callback("请输入有效金额");
    // }
  };

  submit = () => {
    const { form } = this.props;
    const { validateFieldsAndScroll, getFieldsValue } = form;
    console.warn(111, getFieldsValue());
    window.validateFieldsAndScroll = validateFieldsAndScroll;
    validateFieldsAndScroll((err, values) => {
      console.warn(3333, values);
    });
  };

  renderRuleItem = (userType, index) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const titleMap = {
      1: "普通分享官",
      2: "超级分享官"
    };
    const itemKey = `earningsRuleCmdList[${index}]`;
    return (
      <Fragment key={userType}>
        <Divider>{titleMap[userType] || ""}</Divider>
        <FormItem label="直推佣金">
          {getFieldDecorator(`${itemKey}.recommendEarnings`, {
            rules: [
              {
                validator: this.validateMoney
              }
            ]
          })(<Input placeholder="请输入直推佣金" />)}
        </FormItem>
        <FormItem label="自购佣金">
          {getFieldDecorator(`${itemKey}.selfbuyEarnings`, {
            rules: [
              {
                validator: this.validateMoney
              }
            ]
          })(<Input placeholder="请输入直推佣金" />)}
        </FormItem>
        {userType === "2" && (
          <Fragment>
            <FormItem label="平台奖励">
              {getFieldDecorator(`${itemKey}.platformEarnings`, {
                rules: [
                  {
                    validator: this.validateMoney
                  }
                ]
              })(<Input placeholder="请输入平台奖励" />)}
            </FormItem>
            <FormItem label="额外奖励">
              {getFieldDecorator(`${itemKey}.additionalEarnings`, {
                rules: [
                  {
                    validator: this.validateMoney
                  }
                ]
              })(<Input placeholder="请输入额外奖励" />)}
            </FormItem>
          </Fragment>
        )}
      </Fragment>
    );
  };

  render() {
    const { detailDisabled } = this.state;
    const { form } = this.props;
    const { getFieldDecorator, getFieldValue } = form;
    const useCouponId = getFieldValue("useCouponId");
    const id = getFieldValue("id");
    // console.warn(id);
    return (
      <PageHeaderWrapper className={styles.abc}>
        <div className={styles.container}>
          <Form {...this.formItemLayout} disabled={this.isDetail}>
            <Divider>商品基础信息</Divider>
            <FormItem label="商品描述">
              {getFieldDecorator("remark", {
                rules: [
                  {
                    required: true,
                    message: "请输入商品描述符"
                  }
                ]
              })(<Input placeholder="请输入商品描述" />)}
            </FormItem>
            <FormItem label="商品ID">
              {getFieldDecorator("extCommodityId", {
                rules: [
                  {
                    required: true,
                    message: "请输入商品ID"
                  }
                ]
              })(<Input placeholder="请输入御泥坊商品ID" />)}
            </FormItem>
            <FormItem label="是否使用单品券">
              {getFieldDecorator("useCouponId", {
                rules: [
                  {
                    required: true,
                    message: "请选择是否使用单品券"
                  }
                ]
              })(
                <RadioGroup>
                  <Radio value="1" disabled={detailDisabled}>
                    是
                  </Radio>
                  <Radio value="0" disabled={detailDisabled}>
                    否
                  </Radio>
                </RadioGroup>
              )}
            </FormItem>
            {useCouponId === "1" && (
              <FormItem label="单品券ID">
                {getFieldDecorator("couponId", {
                  rules: [
                    {
                      required: true,
                      message: "请选择输入单品券ID"
                    }
                  ]
                })(<Input placeholder="请输入单品券ID" />)}
              </FormItem>
            )}
            <FormItem label="商详推荐理由" required>
              {getFieldDecorator("recommendReason", {
                rules: [
                  {
                    required: true,
                    message: "请选择输入商详推荐理由"
                  }
                ]
              })(<TextArea placeholder="请输入商详推荐理由" autosize />)}
            </FormItem>
            {["1", "2"].map(this.renderRuleItem)}
          </Form>
        </div>
        {!detailDisabled && (
          <div className={styles.btnBox}>
            <Button onClick={this.submit} type="primary">
              保存
            </Button>
          </div>
        )}
      </PageHeaderWrapper>
    );
  }
}
export default CommodityCreate;
