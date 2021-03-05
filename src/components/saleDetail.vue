<template>
  <div class="sale-detail">
    <a-form-model ref="ruleForm"
                  :model="form"
                  :rules="rules"
                  :label-col="{span:5}"
                  :wrapper-col="{span:13}">
      <a-form-model-item label="商品售价"
                         prop="price"
                         required>
        <a-input v-model="form.price" />
      </a-form-model-item>

      <a-form-model-item label="商品折扣价"
                         prop="price_off"
                         required>
        <a-input v-model="form.price_off" />
      </a-form-model-item>

      <a-form-model-item label="商品库存"
                         required
                         prop="inventory">
        <a-input v-model="form.inventory" />
      </a-form-model-item>

      <a-form-model-item label="计量单位"
                         prop="unit"
                         required>
        <a-input v-model="form.unit" />
      </a-form-model-item>

      <a-form-model-item label="商品相册"
                         prop="images">
        <a-upload :action="'https://mallapi.duyiedu.com/upload/images?appkey=' +
                            $store.state.user.appkey"
                  list-type="picture-card"
                  :file-list="fileList"
                  @preview="handlePreview"
                  @change="handleChange"
                  name="avatar">
          <div v-if="fileList.length < 8">
            <a-icon :type=" loading ? 'loading' :'plus' " />
            <div class="ant-upload-text">
              Upload
            </div>
            <a-modal :visible="previewVisible"
                     :footer="null"
                     @cancel="handleCancel">
              <img alt="example"
                   style="width: 100%"
                   :src="previewImage" />
            </a-modal>
          </div>
        </a-upload>
      </a-form-model-item>

      <a-form-model-item label=""
                         class="next-btn"
                         :wrapperCol="{span:24}">
        <a-button type="default"
                  @click="prev">上一步</a-button>
        <a-button type="primary"
                  @click="next">完成</a-button>
      </a-form-model-item>

    </a-form-model>
  </div>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  data() {
    return {
      fileList: [],
      rules: {},
      loading: false,
      previewVisible: false,
      previewImage: '',
    };
  },
  props: ['form'],
  methods: {
    handleChange({ file, fileList }) {
      console.log(file);
      if (file.status === 'done') {
        this.form.images.push(file.response.data.url);
      } else if (file.status === 'removed') {
        const { url } = file.response.data;
        this.form.images = this.form.images.filter((item) => item !== url);
      }
      this.fileList = fileList;
    },
    prev() {
      this.$emit('prev', this.from);
    },
    next() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('next', this.form);
          return true;
        }
        console.log('error submit!!');
        return false;
      });
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      const obj = file;
      if (!file.url && !file.preview) {
        obj.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
  },
};
</script>
