<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait HasImage
{
    // delete dan save image satu
    public function replaceImage($file, string $name)
    {
        if ($this->getFirstMedia($name)) $this->deleteMedia($this->getFirstMedia($name)->id);
        return $this->addMedia($file)->usingName(Str::random(20))->usingFileName(md5($file->getClientOriginalName()).'.'.$file->extension())->toMediaCollection($name);
    }

    // delete dan save image (bentuk data array)
    public function replaceImageArray($file, string $name, $index)
    {
        if (isset($this->getMedia($name)[$index])&&$this->getMedia($name)[$index]) $this->deleteMedia($this->getMedia($name)[0]->id);
        return $this->addMedia($file)->usingName(Str::random(20))->usingFileName(md5($file->getClientOriginalName()).'.'.$file->extension())->toMediaCollection($name);
    }

    /**
     * Get avatar image url
     * @return string
     */
    public function getImageAvatarAttribute(): string
    {
        return $this->avatar ?
            $this->avatar :
            '/assets/default/user_default.png';
    }
}
