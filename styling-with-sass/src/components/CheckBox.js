import React from 'react';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import styles from './CheckBox.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function CheckBox({ checked, children, ...rest }) {
    return (
        /* module.css + classnames : 독자적 고유 클래스명 생성
         * classnames의 bind함수를 이용하면 고유한 클래스명을 간편하게 연이어 생성할수 있음
         * ex) className={cx('checkbox', 'color', { active: true })}
         */
        <div className={cx('checkbox')}>
            <label>
                <input type="checkbox" checked={checked} {...rest} />
                <div className={cx('icon')}>
                    {checked ? (
                        <MdCheckBox className={cx('checked')} />
                    ) : (
                        <MdCheckBoxOutlineBlank />
                    )}
                </div>
            </label>
            <span>{children}</span>
        </div>
    );
}

export default CheckBox;
