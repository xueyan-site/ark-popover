import React from 'react'
import styles from './placements.scss'
import { BubblePopover } from 'ark-popover'

export function Placements() {
  return (
    <p>
      <div className={styles.row}>
        <div className={styles.item}></div>
        <div className={styles.item}>
          <BubblePopover placement='topLeft' content="内容">
            <div className={styles.inner}>topLeft</div>
          </BubblePopover>
        </div>
        <div className={styles.item}>
          <BubblePopover placement='top' content="内容">
            <div className={styles.inner}>top</div>
          </BubblePopover>
        </div>
        <div className={styles.item}>
          <BubblePopover placement='topRight' content="内容">
            <div className={styles.inner}>topRight</div>
          </BubblePopover>
        </div>
        <div className={styles.item}></div>
      </div>

      <div className={styles.row}>
        <div className={styles.item}>
          <BubblePopover placement='leftTop' content="内容">
            <div className={styles.inner}>leftTop</div>
          </BubblePopover>
        </div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}>
          <BubblePopover placement='rightTop' content="内容">
            <div className={styles.inner}>rightTop</div>
          </BubblePopover>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.item}>
          <BubblePopover placement='left' content="内容">
            <div className={styles.inner}>left</div>
          </BubblePopover>
        </div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}>
          <BubblePopover placement='right' content="内容">
            <div className={styles.inner}>right</div>
          </BubblePopover>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.item}>
          <BubblePopover placement='leftBottom' content="内容">
            <div className={styles.inner}>leftBottom</div>
          </BubblePopover>
        </div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}></div>
        <div className={styles.item}>
          <BubblePopover placement='rightBottom' content="内容">
            <div className={styles.inner}>rightBottom</div>
          </BubblePopover>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.item}></div>
        <div className={styles.item}>
          <BubblePopover placement='bottomLeft' content="内容">
            <div className={styles.inner}>bottomLeft</div>
          </BubblePopover>
        </div>
        <div className={styles.item}>
          <BubblePopover placement='bottom' content="内容">
            <div className={styles.inner}>bottom</div>
          </BubblePopover>
        </div>
        <div className={styles.item}>
          <BubblePopover placement='bottomRight' content="内容">
            <div className={styles.inner}>bottomRight</div>
          </BubblePopover>
        </div>
        <div className={styles.item}></div>
      </div>
    </p>
  )
}