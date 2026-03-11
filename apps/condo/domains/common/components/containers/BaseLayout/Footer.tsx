import { Layout, Row, Col } from 'antd'
import getConfig from 'next/config'
import React from 'react'

import { useIntl } from '@open-condo/next/intl'

import { SecondaryLink } from '@condo/domains/user/components/auth/SecondaryLink'

import styles from './Footer.module.css'


interface FooterConfig {
    [locale: string]: {
        privacyPolicyLink?: string
    }
}

const { publicRuntimeConfig: { footerConfig } } = getConfig() as { publicRuntimeConfig: { footerConfig: FooterConfig } }

export const Footer: React.FC = () => {
    const intl = useIntl()
    const privacyPolicyText = intl.formatMessage({ id: 'PrivacyPolicy' })

    const localizedFooterConfig = footerConfig?.[intl?.locale] || null

    return localizedFooterConfig && (
        <Layout.Footer
            className={styles.footer}
        >
            <Row justify='end' align='middle' style={{ gap: '16px' }}>
                <Col>
                    <span style={{ color: 'var(--condo-global-color-gray-7, #828797)', fontSize: '12px' }}>
                        Powered by <a href="https://github.com/open-condo-software/condo" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Condo (MIT License)</a>
                    </span>
                </Col>
                {
                    localizedFooterConfig?.privacyPolicyLink &&
                    <Col>
                        <SecondaryLink
                            size='small'
                            href={localizedFooterConfig?.privacyPolicyLink}
                            target='_blank'
                        >
                            {privacyPolicyText}
                        </SecondaryLink>
                    </Col>
                }
            </Row>
        </Layout.Footer>
    )
}
