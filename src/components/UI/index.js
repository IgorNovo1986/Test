import MyButton from "@/components/UI/MyButton"
import MyInput from "@/components/UI/MyInput"
import MyDialog from "@/components/UI/MyDialog"
import MySelect from "@/components/UI/MySelect"

const FormElements = {
    install(Vue) {
        Vue.component(MyButton.name, MyButton)
        Vue.component(MyInput.name, MyInput)
        Vue.component(MyDialog.name, MyDialog)
        Vue.component(MySelect.name, MySelect)
    }
}

export default FormElements