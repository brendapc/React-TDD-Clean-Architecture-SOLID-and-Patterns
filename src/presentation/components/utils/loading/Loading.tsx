import React from 'react'
import { Spinner } from '@/presentation/components/utils'
import Styles from './loading.styles.scss'

export const Loading: React.FC = () => {
    return (
        <div data-testid="loading" className={Styles.loadingWrapper}>
            <div className={Styles.lodingComponent}>
                <span>Aguarde...</span>
                <Spinner isNegative={true} />
            </div>
        </div>
    )
}
