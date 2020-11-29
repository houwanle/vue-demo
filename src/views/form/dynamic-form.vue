<!-- 动态表单 -->
<template>
  <div class="contentCommon">
    <Card>
      <p slot="title">动态form</p>

      <Form ref="formDynamic" :model="formDynamic" style="width: 300px">
        <template v-for="(item, index) in formDynamic.items">
          <Row v-if="item.status" :key="index">
            <Col span="18">
              <FormItem
                :prop="'items.' + index + '.value'"
                :rules="diffTypeRules(item)"
              >
                <Input
                  v-if="item.type === 'input'"
                  type="text"
                  v-model="item.value"
                  placeholder="Enter something..."
                ></Input>
                <DatePicker
                  v-if="item.type === 'date'"
                  type="datetimerange"
                  v-model="item.value"
                  format="yyyy-MM-dd HH:mm"
                  placeholder="Select date and time(Excluding seconds)"
                  style="width: 300px"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col span="4" offset="1" v-if="item.type === 'input'">
              <Button @click="handleRemove(index)">Delete</Button>
            </Col>
          </Row>
        </template>
        <FormItem>
          <Row>
            <Col span="12">
              <Button type="dashed" long @click="handleAdd" icon="md-add"
                >Add item</Button
              >
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formDynamic')"
            >Submit</Button
          >
          <Button @click="handleReset('formDynamic')" style="margin-left: 8px"
            >Reset</Button
          >
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formDynamic: {
        items: [
          {
            value: '',
            index: 0,
            type: 'input',
            status: 1
          },
          {
            value: '',
            index: 1,
            type: 'date',
            status: 1
          }
        ]
      }
    }
  },
  methods: {
    // 不同的type走不同的rules
    diffTypeRules (item) {
      const checkDate = (rule, value, callback) => {
        const index = value.findIndex((v) => !v)
        if (!value) {
          callback(new Error('Please enter your password'))
        } else if (index > -1) {
          callback(new Error('Please enter your password'))
        } else {
          callback()
        }
      }
      switch (item.type) {
        case 'input':
          return {
            required: true,
            message: 'Item ' + item.index + ' can not be empty',
            trigger: 'blur'
          }
        case 'date':
          return {
            type: 'array',
            min: 1,
            required: true,
            validator: checkDate,
            trigger: 'change'
          }

        default:
          break
      }
    },

    handleSubmit (name) {
      console.log(this.formDynamic.items)
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    handleAdd () {
      const index = this.formDynamic.items.length
      if (index > 10) {
        this.$Message.info('最多仅允许添加5次')
        return false;
      }
      this.formDynamic.items.push(
        {
          value: '',
          type: 'input',
          index: index,
          status: 1
        },
        {
          value: '',
          type: 'date',
          index: index + 1,
          status: 1
        }
      )
    },
    handleRemove (index) {
      // 这里可以优化，如果是多个type类型可以写成循环
      this.formDynamic.items[index].status = 0
      this.formDynamic.items[index + 1].status = 0
    }
  }
}
</script>

<style>
</style>