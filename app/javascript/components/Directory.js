import React, {useState, useEffect} from 'react'
import styles from '../stylesheets/directory.module.css'

export default function Directory({
    files
}) {
    return (
        <div className={styles.section}>
            <h2>Directory</h2>
            {/* {files.map(f => (
                <div>

                </div>
            ))} */}
        </div>
    )
}