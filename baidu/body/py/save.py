import cv2
import numpy as np
import base64

def save_labelmap(r,path1)
    labelmap = base64.b64decode(r)
    nparr = np.fromstring(labelmap, np.uint8)
    labelimg = cv2.imdecode(nparr, 1)
    # width, height为图片原始宽、高
    labelimg = cv2.resize(labelimg, (width, height), interpolation=cv2.INTER_NEAREST)
    im_new = np.where(labelimg==1, 255, labelimg)
    cv2.imwrite(path1, im_new)

