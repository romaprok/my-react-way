import React from "react";
import s from "../Profile.module.css";
import Post from "./Post"
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../../utils/validators/validators";
import {Textarea} from "../../../../common/FormsControls/FormsControls";

const maxLength10 = maxLengthCreator(10)

const Posts = React.memo(props => {
    let postsMessages = props.postData.map(p => <Post  key={p.id} message={p.message} likes={p.likesCount}/>);

    let addNewPost = (values) => {
        debugger
        props.sendMessage(values.newPostText);
        values.newPostText = ''
    };
    return (
        <div className={s.container}>
            <div className={s.posts}>
                <h3>My posts</h3>
                <AddNewPostFormRedux onSubmit={addNewPost}/>
                {postsMessages}
            </div>
        </div>
    )
});
const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field name={'newPostText'} component={Textarea} placeholder={'Yo'}
            validate={[required, maxLength10]}/></div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}
 let AddNewPostFormRedux = reduxForm({form: 'ProfileAddNewPostForm'})(AddNewPostForm)
export default Posts;