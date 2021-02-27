<template>
  <div class="login">
    <a-form-model class="login-from"
                  ref="enrollFrom"
                  :model="enrollFrom"
                  :rules="rules"
                  v-bind="layout">
      <!-- 邮箱 -->
      <a-form-model-item has-feedback
                         label="邮箱"
                         prop="email">
        <a-input v-model="enrollFrom.email" />
      </a-form-model-item>
      <!-- 密码 -->
      <a-form-model-item has-feedback
                         label="密码"
                         prop="password">
        <a-input v-model="enrollFrom.password"
                 type="password"
                 autocomplete="off" />
      </a-form-model-item>
      <!-- 验证码 -->
      <a-form-model-item has-feedback
                         label="验证码"
                         prop="code">
        <a-input v-model="enrollFrom.code" />
        <a-button type="button"
                  @click="setCode('enrollFrom')">
          获取验证码
        </a-button>
      </a-form-model-item>
      <!-- 用户名 -->
      <a-form-model-item has-feedback
                         label="用户名"
                         prop="username">
        <a-input v-model="enrollFrom.username" />
      </a-form-model-item>
      <!-- 用户角色 -->
      <a-form-model-item label="用户角色"
                         prop="role">
        <a-radio-group v-model="enrollFrom.role">
          <a-radio value="customer">
            customer
          </a-radio>
          <a-radio value="admin">
            admin
          </a-radio>
        </a-radio-group>
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary"
                  @click="submitForm('enrollFrom')">
          提交
        </a-button>
        <a-button style="margin-left: 10px"
                  @click="resetForm('enrollFrom')">
          重置
        </a-button>
      </a-form-model-item>
      <router-link :to="{name:'Login'}">已经注册去登入</router-link>
    </a-form-model>

  </div>
</template>
<script>
import api from '@/api/user';

export default {
  data() {
    const emailReg = /^[\w-]+@[\w.-]+.com$/;
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入邮箱'));
      }
      if (emailReg.test(value)) {
        return callback();
      }
      return callback(new Error('邮箱格式错误'));
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    const checkCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'));
      } else {
        callback();
      }
    };
    const checkUserName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        callback();
      }
    };

    return {
      enrollFrom: {
        email: '',
        password: '',
        code: '',
        username: '',
        role: '',
      },
      rules: {
        password: [{ validator: validatePass, trigger: 'change' }],
        email: [{ validator: checkEmail, trigger: 'change' }],
        code: [{ validator: checkCode, trigger: 'change' }],
        username: [{ validator: checkUserName, trigger: 'change' }],

      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api
            .enroll(this.enrollFrom)
            .then((res) => {
              console.log(res);
              this.$store.dispatch('setUserInfo', res);
              this.$router.push({
                name: '/Login',
              });
            })
            .catch((error) => {
              this.$message.error(error);
            });
          return true;
        }
        console.log('error submit!!');
        return false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    setCode() {
      console.log(this.enrollFrom);
      api.code(this.enrollFrom).then((res) => {
        console.log(res);
      }).catch((error) => {
        this.$message.error(error);
      });
    },
  },
};
</script>

<style lang="less">
@import url('~@/assets/css/login.less');
</style>
