<?php

namespace App\Helpers;
use Illuminate\Support\Collection;

class UtilHelper {
    public static function splitIntoChunks($collection, int $size): Collection
    {
        $chunks = new Collection();
        $currentChunk = new Collection();
    
        foreach ($collection as $item) {
            $currentChunk->push($item);
    
            if ($currentChunk->count() === $size) {
                $chunks->push($currentChunk);
                $currentChunk = new Collection();
            }
        }
    
        if ($currentChunk->isNotEmpty()) {
            $chunks->push($currentChunk);
        }
    
        return $chunks;
    }
}