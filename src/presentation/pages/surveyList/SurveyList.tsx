import { Footer, LoggedInHeader } from '@/presentation/components/layout'
import React from 'react'
import Styles from './surveyList-styles.scss'

export const SurveyList: React.FC = () => {
  return (
        <div className={Styles.surveyListWrapper}>
            <LoggedInHeader />
            <div className={Styles.contentWrapper}>
                <h2>Enquetes</h2>
                <ul>
                    <li>
                        <div className={Styles.surveyContent}>
                            <div className={[Styles.iconWrapper, Styles.green].join(' ')}>
                                <img className={Styles.thumbsDownIcon} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAAEgAAAAA9nQVdAAAA70lEQVQ4Ea2RPQoCQQyFZ/w5g72lYOEVPIiV2IkIHmCvIZ5D77BgZWtrYWe1ICiuL8tEwjIZZmYNZCf7knyTzRrjrK7rAfwAr+AheyNZwiei98gNrBkISxYjz5KbZb0V4gXxlN8jzo+1tk91BOT6nhPmOFNg1Nb0UiCNxY0Uu8QW044BuMIZHs3DJzcra3/yOgem3UoT3pEcaQUh3TchAX9/KNTsy/mAtLebrzhXI+AqE/oQl55ErIfYxp5WothW71QyAJ0VWKG06DJAQ/jTA0yH0TUAzf4Gc8BFC5g3GcHI3IQvBy0asesDsB08CfYFB/44kX6+Hj8AAAAASUVORK5CYII=" alt="" />
                            </div>
                            <time>
                                <span className={Styles.day}>05</span>
                                <span className={Styles.month}>07</span>
                                <span className={Styles.year}>2021</span>
                            </time>
                            <p>
                                Qual é seu framework preferido?
                            </p>
                        </div>
                        <footer>Ver resultado</footer>
                    </li>

                </ul>
            </div>
            <Footer />
        </div>
  )
}
