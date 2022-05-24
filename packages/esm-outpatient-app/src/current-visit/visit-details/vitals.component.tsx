import React from 'react';
import { Button, Grid, Row, Tag, Tile } from 'carbon-components-react';
import { useTranslation } from 'react-i18next';
import { calculateBMI } from '../current-visit.resource';
import { PatientVitals } from '../../types/index';
import ArrowRight16 from '@carbon/icons-react/es/arrow--right/16';
import { navigate } from '@openmrs/esm-framework';
import styles from './triage-note.scss';
import CircleFillGlyph from '@carbon/icons-react/es/circle--solid/16';
interface VitalsComponentProps {
  vitals: Array<PatientVitals>;
  patientUuid: string;
}

const Vitals: React.FC<VitalsComponentProps> = ({ vitals, patientUuid }) => {
  const { t } = useTranslation();

  const vitalsToDisplay = vitals.reduce(
    (previousVital, currentVital) => Object.assign(previousVital, currentVital),
    {},
  );

  return (
    <div>
      {Object.keys(vitalsToDisplay).length > 0 ? (
        <div>
          <Grid className={styles.grid}>
            <Row>
              <Tile light>
                <p>{t('temperature', 'Temperature')}</p>
                <div className={styles.vitalValuesWrapper}>
                  <p className={styles.vitalValues}>
                    {vitalsToDisplay.temperature ? vitalsToDisplay.temperature : '--'}
                  </p>
                  <p className={styles.unit}>{t('°C', '°C')}</p>
                </div>
              </Tile>
              <Tile light>
                <p>{t('bp', 'Bp')}</p>
                <div className={styles.vitalValuesWrapper}>
                  <p className={styles.vitalValues}>{vitalsToDisplay.systolic ? vitalsToDisplay.systolic : '--'}</p>
                  <p className={styles.unit}> {t('mmHg', 'mmHg')}</p>
                </div>
              </Tile>
              <Tile>
                <p>
                  {t('heartRate', 'Heart rate')} <CircleFillGlyph className={styles.notification} />
                </p>
                <div className={styles.vitalValuesWrapper}>
                  <p className={styles.vitalValues}>{vitalsToDisplay.pulse ? vitalsToDisplay.pulse : '--'}</p>
                  <p className={styles.unit}>{t('bpm', 'bpm')}</p>
                </div>
              </Tile>
            </Row>

            <Row>
              <Tile light>
                <p>{t('sp02', 'Sp02')}</p>
                <div className={styles.vitalValuesWrapper}>
                  <p className={styles.vitalValues}>
                    {vitalsToDisplay.oxygenSaturation ? vitalsToDisplay.oxygenSaturation : '--'}
                  </p>
                  <p className={styles.unit}>{t('%', '%')}</p>
                </div>
              </Tile>
              <Tile light>
                <p>{t('rRate', 'R. Rate')}</p>
                <div className={styles.vitalValuesWrapper}>
                  <p className={styles.vitalValues}>
                    {vitalsToDisplay.respiratoryRate ? vitalsToDisplay.respiratoryRate : '--'}
                  </p>
                  <p className={styles.unit}>{t('/min', '/ min')}</p>
                </div>
              </Tile>
            </Row>

            <Row>
              <Tile light>
                <p>{t('height', 'Height')}</p>
                <div className={styles.vitalValuesWrapper}>
                  <p className={styles.vitalValues}>{vitalsToDisplay.height ? vitalsToDisplay.height : '--'}</p>
                  <p className={styles.unit}>{t('cm', 'cm')}</p>
                </div>
              </Tile>
              <Tile light>
                <p>{t('bmi', 'Bmi')}</p>
                <div className={styles.vitalValuesWrapper}>
                  <p className={styles.vitalValues}>
                    {' '}
                    {calculateBMI(Number(vitalsToDisplay.weight), Number(vitalsToDisplay.height))}
                  </p>
                  <p className={styles.unit}>{t('kg/m²', 'kg / m²')}</p>
                </div>
              </Tile>
              <Tile light>
                <p>{t('weight', 'Weight')}</p>
                <div className={styles.vitalValuesWrapper}>
                  <p className={styles.vitalValues}>{vitalsToDisplay.weight ? vitalsToDisplay.weight : '--'} </p>
                  <p className={styles.unit}>{t('kg', 'kg')}</p>
                </div>
              </Tile>
            </Row>
          </Grid>
          <p className={styles.subHeading}>
            {vitalsToDisplay.provider.name ? <span> {vitalsToDisplay.provider.name} </span> : null} ·{' '}
            {vitalsToDisplay.time}
          </p>
        </div>
      ) : (
        <div>
          <p className={styles.emptyText}>
            {t('vitalsNotRecordedForVisit', 'Vitals has not been recorded for this patient for this visit')}
          </p>
          <Button
            size="small"
            kind="ghost"
            renderIcon={ArrowRight16}
            onClick={() => navigate({ to: `\${openmrsSpaBase}/patient/${patientUuid}/chart` })}
            iconDescription={t('vitalsForm', 'Vitals form')}>
            {t('vitalsForm', 'Vitals form')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Vitals;