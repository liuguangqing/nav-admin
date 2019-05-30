import Link from 'umi/link';
import React, { Component, Fragment } from 'react'
import Redirect from 'umi/redirect';
<Redirect to="/login" />

class log extends Component {
    componentDidMount() {
        console.log('loading')
    }
    render() {
        return(
            <Redirect to="/material" />
        )
    }
}
export default log
