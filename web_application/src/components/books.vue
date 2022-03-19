<template>
  <div>
    <p>{{ text }}</p>
    <p>{{ message.value }}</p>
    <p>{{ message.value.length }}</p>
    <p>{{ upsertParam.controlNo }}</p>
    <p>{{ upsertParam.category }}</p>
    <p>{{ upsertParam.status }}</p>
    <p>{{ list[2] }}</p>
    <p>{{ list[num] }}</p>
    <p>{{ 1 + 1 }}</p>
    <v-row dense>
      <v-col>
        <v-card outlined>
          <v-card-title>登録内容</v-card-title>
          <v-card-text>
            <v-form>
              <v-row dense>
                <v-col cols="3">
                  <v-text-field
                    label="管理番号"
                    v-model="upsertParam.controlNo"
                    outlined
                    dense
                    clearable
                  />
                </v-col>
                <v-col cols="3">
                  <v-select
                    label="カテゴリ"
                    v-model="upsertParam.category"
                    :items="categories"
                    item-text="name"
                    item-value="name"
                    outlined
                    dense
                    clearable
                  />
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    label="本の名前"
                    v-model="upsertParam.bookName"
                    outlined
                    dense
                    clearable
                  />
                </v-col>
                <v-col cols="3">
                  <v-select
                    label="状態"
                    v-model="upsertParam.status"
                    :items="statuses"
                    item-text="name"
                    item-value="name"
                    outlined
                    dense
                    clearable
                  />
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    label="購入日"
                    v-model="upsertParam.purchaseDate"
                    outlined
                    dense
                    clearable
                  />
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    label="購入者"
                    v-model="upsertParam.purchasePerson"
                    outlined
                    dense
                    clearable
                  />
                </v-col>
                <v-spacer />
                <v-col cols="2">
                  <v-btn
                    color="primary"
                    block
                    depressed
                    @click="upsert"
                  >登録・更新する</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-card outlined>
          <v-card-title>フィルター条件</v-card-title>
          <v-card-text>
            <v-form>
              <v-row dense>
                <v-col cols="3">
                  <v-select
                    label="カテゴリ"
                    v-model="searchParam.category"
                    :items="categories"
                    item-text="name"
                    item-value="code"
                    outlined
                    dense
                    clearable
                  />
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    label="本の名前"
                    v-model="searchParam.bookName"
                    outlined
                    dense
                    clearable
                  />
                </v-col>
                <v-spacer />
                <v-col cols="2">
                  <v-btn
                    color="primary"
                    block
                    depressed
                    @click="search"
                  >フィルターする</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-card outlined>
          <v-card-title>検索結果</v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="books"
              disable-pagination
              hide-default-footer
              @click:row="openDetail"
              dense
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      text: 'Vue.js!',
      message: {
        value: 'Hello Vue.js!'
      },
      index: 0,
      flg: 0,
      list: ['りんご', 'ばなな', 'いちご'],
      // 別のデータを使用してlistから取り出す要素を動的に 4 で使用
      num: 1,
      headers: [
        {
          text: '管理番号',
          value: 'controlNo'
        },
        {
          text: 'カテゴリ',
          value: 'category'
        },
        {
          text: '本の名前',
          value: 'bookName'
        },
        {
          text: '状態',
          value: 'status'
        },
        {
          text: '購入日',
          value: 'purchaseDate'
        },
        {
          text: '購入者',
          value: 'purchasePerson'
        }
      ],
      books: [
        {
          controlNo: '11111',
          category: 'ホラー',
          bookName: 'おばけの話',
          status: '未読',
          purchaseDate: '2022/1/1',
          purchasePerson: '佐藤さん'
        },
        {
          controlNo: '22222',
          category: 'サスペンス',
          bookName: '警察24時',
          status: '完読',
          purchaseDate: '2022/2/1',
          purchasePerson: '伊藤さん'
        },
        {
          controlNo: '33333',
          category: 'ファンタジー',
          bookName: 'ファンタジスタ太郎',
          status: '読中',
          purchaseDate: '2022/3/1',
          purchasePerson: '加藤さん'
        }
      ],
      upsertParam: {
        controlNo: '',
        category: '',
        bookName: '',
        status: '',
        purchaseDate: '',
        purchasePerson: ''
      },
      searchParam: {
        category: '',
        bookName: ''
      },
      categories: [
        {
          code: '1',
          name: 'ホラー'
        },
        {
          code: '2',
          name: 'サスペンス'
        },
        {
          code: '3',
          name: 'ファンタジー'
        }
      ],
      statuses: [
        {
          code: '1',
          name: '未読'
        },
        {
          code: '2',
          name: '読中'
        },
        {
          code: '3',
          name: '完読'
        }
      ]
    }
  },
  async created () {
    const result = await this.$script.sample()
    console.log('サーバー関数実行結果: ', result)
  },
  computed: {
    reversedMessage: function () {
      return this.msg.split('').reverse().join('')
    }
  },
  methods: {
    greet: function (event) {
      alert(event.target.tagName)
    },
    say: function (msg) {
      alert(msg)
    },
    upsert: function () {
      console.log('upsertクリック')
      console.log(this.books)
      console.log(this.books[0].controlNo)
      console.log(this.upsertParam.controlNo)
      console.log(this.upsertParam.category)
      console.log(this.upsertParam.bookName)
      console.log(this.upsertParam.status)
      console.log(this.upsertParam.purchaseDate)
      console.log(this.upsertParam.purchasePerson)
      console.log(this.books.controlNo)
      for (var index = 0; index <= this.books.length - 1; index++) {
        console.log(this.books[index])
        console.log(this.books.length)
        console.log(index)
        console.log(this.books[index].controlNo)
        if (this.books[index].controlNo === this.upsertParam.controlNo) {
          console.log(index + 1 + '番目と一致した')
          this.$set(this.books, index, {
            controlNo: this.upsertParam.controlNo,
            category: this.upsertParam.category,
            bookName: this.upsertParam.bookName,
            status: this.upsertParam.status,
            purchaseDate: this.upsertParam.purchaseDate,
            purchasePerson: this.upsertParam.purchasePerson
          }
          )
          break
        }
      }
      console.log(this.books[index])
      console.log(index)
      console.log(this.books.length)
      if (index === this.books.length) {
        this.books.push({
          controlNo: this.upsertParam.controlNo,
          category: this.upsertParam.category,
          bookName: this.upsertParam.bookName,
          status: this.upsertParam.status,
          purchaseDate: this.upsertParam.purchaseDate,
          purchasePerson: this.upsertParam.purchasePerson
        }
        )
      }
      this.upsertParam.controlNo = ''
      this.upsertParam.category = ''
      this.upsertParam.bookName = ''
      this.upsertParam.status = ''
      this.upsertParam.purchaseDate = ''
      this.upsertParam.purchasePerson = ''
    },
    search () {
      console.log('searchクリック')
    },
    openDetail (rowData) {
      console.log('行クリック', rowData)
      console.log(rowData.controlNo)
      this.upsertParam.controlNo = rowData.controlNo
      this.upsertParam.category = rowData.category
      this.upsertParam.bookName = rowData.bookName
      this.upsertParam.status = rowData.status
      this.upsertParam.purchaseDate = rowData.purchaseDate
      this.upsertParam.purchasePerson = rowData.purchasePerson
    }
  }
}
</script>
