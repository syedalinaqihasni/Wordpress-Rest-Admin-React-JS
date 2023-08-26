import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import withHttp from 'wordpress-rest-admin/hoc/withHttp';
import withForm from 'wordpress-rest-admin/hoc/withForm';
import withPage from 'wordpress-rest-admin/hoc/contents/withPage';
import Form from 'wordpress-rest-admin/components/Form';
import PostSettings, {
    PostSettingsStatus,
    PostSettingsMoreOptions,} from 'wordpress-rest-admin/components/posts/PostSettings';

import PostTitle from 'wordpress-rest-admin/components/posts/PostTitle';
import PostContent from 'wordpress-rest-admin/components/posts/PostContent';
import PostToolbar from 'wordpress-rest-admin/components/posts/PostToolbar';

class Create extends React.Component {

    componentWillMount(){

        const {page, history, _basePath,} = this.props;

        page.bind(this, {
            submitAfter: json => {
                history.replace(`${_basePath}/pages/Edit/${json.id}`);
            },
        });

        this.initEdit = {
            status: 'draft',
            format: 'standard',
            categories: [],
            tags: []
        };

    }

    render(){ 
        const {
          formValues,
          doSubmit,
          getFormId} = this.props;

        const edit = Object.assign({}, this.initEdit, formValues.values);

        return (<div>
          <Form form={getFormId()} onSubmit={this.page.handleSubmit} >

            <PostToolbar onSubmit={doSubmit} isCreate={true}/>

            <PostSettings>
               <PostSettingsStatus  edit={edit} />
               <PostSettingsMoreOptions edit={edit} />
            </PostSettings>

            <PostTitle edit={edit} />
            <PostContent edit={edit} />

          </Form>
        </div>);
    }
}

export default compose(
    withPage({namespace: 'page'}),
    withHttp(),
    connect(),
    withForm({id: '_create_page'}),
)(Create);


