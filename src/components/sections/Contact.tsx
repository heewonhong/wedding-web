import classNames from 'classnames/bind'
import Section from '@shared/Section'
import styles from './Contact.module.scss'
import Accordion from '@shared/Accordion'
import { Person, Wedding } from '@models/wedding'

const cx = classNames.bind(styles)

function Contact({
  groom,
  bride,
}: {
  groom: Wedding['groom']
  bride: Wedding['bride']
}) {
  return (
    <Section title="연락처 및 마음 전하실 곳">
      <Accordion label="신랑측">
        <ContactInfo
          name={groom.name}
          account={groom.account}
          phoneNumber={groom.phoneNumber}
        />
        <ContactInfo
          name={groom.parents[0].name}
          account={groom.parents[0].account}
          phoneNumber={groom.parents[0].phoneNumber}
        />
        <ContactInfo
          name={groom.parents[1].name}
          account={groom.parents[1].account}
          phoneNumber={groom.parents[1].phoneNumber}
        />
      </Accordion>
      <Accordion label="신부측">
        <ContactInfo
          name={bride.name}
          account={bride.account}
          phoneNumber={bride.phoneNumber}
        />
        <ContactInfo
          name={bride.parents[0].name}
          account={bride.parents[0].account}
          phoneNumber={bride.parents[0].phoneNumber}
        />
        <ContactInfo
          name={bride.parents[1].name}
          account={bride.parents[1].account}
          phoneNumber={bride.parents[1].phoneNumber}
        />
      </Accordion>
    </Section>
  )
}

function ContactInfo({ name, account, phoneNumber }: Person) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${account.bankName} ${account.accountNumber}`,
      )
      alert('복사가 완료되었습니다.')
    } catch (err) {
      // 폴백: 구형 브라우저 지원
      const textarea = document.createElement('textarea')
      textarea.value = `${account.bankName} ${account.accountNumber}`
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      alert('복사가 완료되었습니다.')
    }
  }

  return (
    <div className={cx('wrap-contact')}>
      {/* 정보표현 */}
      <div className={cx('wrap-contact-info')}>
        <span>{`${account.bankName} | ${account.accountNumber}`}</span>
        <span>{name}</span>
      </div>
      {/* 버튼들 */}
      <ul className={cx('wrap-buttons')}>
        <li>
          <a href={`tel: ${phoneNumber}`} className={cx('button')}>
            전화
          </a>
        </li>
        <li>
          <button onClick={handleCopy} className={cx('button')}>
            복사
          </button>
        </li>
        {account.kakaopayLink != null ? (
          <li>
            <a
              href={account.kakaopayLink}
              className={cx('button')}
              target="_blank"
              rel="noreferrer"
            >
              송금
            </a>
          </li>
        ) : null}
      </ul>
    </div>
  )
}

export default Contact
