import React from 'react';
import styles from "./Education.module.css";
import educationData from "../../data/education.json";
import { getImageURL } from "../../utils"
import LocationOnIcon from '@mui/icons-material/LocationOn';  // Import Material UI Icon

export default function Education() {
    return (
        <section id='education' className={styles.container}>
            <h2 className={styles.title}>Education</h2>
            <div className={styles.content}>
                <ul className={styles.educationList}>
                    {educationData.map((educationItem, index) => (
                        <li key={index} className={styles.educationItem}>
                            <div className={styles.card}>
                                <div className={styles.educationItemDetails}>
                                    <div className={styles.header}>
                                        <img src={getImageURL(educationItem.imageSrc)} alt={`Logo of ${educationItem.institution}`} className={styles.institutionImage} />
                                        <div>
                                            <h3 className={styles.degree}>{educationItem.degree}</h3>
                                            <h4 className={styles.fieldOfStudy}>{educationItem.fieldOfStudy}</h4>
                                            <p className={styles.institution}>{educationItem.institution}</p>
                                            <p className={styles.location}>
                                                <LocationOnIcon className={styles.locationIcon} /> {educationItem.location}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
