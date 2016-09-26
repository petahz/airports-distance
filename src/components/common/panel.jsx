import React from 'react';

export default function Panel ({
    faIcon,
    title,
    style,
    children
}) {
    return (
        <section style={{...styles.container, ...style}}>
            <h5 style={styles.heading}>
                <i className={`fa fa-${faIcon}`} aria-hidden="true"></i>
                <span style={styles.title}>{ title }</span>
            </h5>
            <section style={styles.content}>
                { children }
            </section>
        </section>
    )
}

const styles = {
    container: {
        margin: 5,
        padding: 5,
        backgroundColor: '#E2FBFF',
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        border: '1px solid #1976D2'
    },
    heading: {
        color: '#1976D2',
        margin: 0,
        marginBottom: 5
    },
    title: {
        marginLeft: 8
    },
    content: {
        padding: 5
    }
};